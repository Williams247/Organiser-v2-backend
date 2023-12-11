import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { UserPayload, Status } from "@utils";
import { fetchById } from "@services";
import { UserModel } from "@models";
import { Props, UserProps } from "./type";

export const auth =
  ({ userType, forAllUsers }: Props) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let token = request.headers["authorization"];
      if (!token)
        return response
          .status(Status.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });

      if (!token.startsWith("Bearer "))
        return response
          .status(Status.UNAUTHORIZED)
          .json({ success: false, message: "Token must have a bearer prefix" });

      token = token.slice(7, token.length);

      const isAuthrized = (await JWT.verify(
        token,
        process.env.SECRET as string
      )) as UserPayload;

      if (!isAuthrized)
        return response
          .status(Status.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });

      const authorized = (await fetchById({
        model: UserModel,
        id: isAuthrized.id,
      })) as UserProps;

      if (authorized.data.disabled)
        return response.status(Status.FORBIDDEN).json({
          success: false,
          message: "You're disabled contact the admin",
        });

      if (forAllUsers) {
        request.user = authorized.data;
        next();
        return;
      }

      if (authorized.data.role !== userType) {
        return response
          .status(Status.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });
      }

      request.user = authorized.data;
      next();
    } catch (error) {
      response
        .status(Status.SERVER_ERROR)
        .json({ success: false, message: "Token is invalid or expired" });
      console.log(error);
    }
  };
