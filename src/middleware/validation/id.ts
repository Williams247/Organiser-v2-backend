import { Request, Response, NextFunction } from "express";
import { Status } from "@utils";

export const idPattern = /^[0-9a-fA-F]{24}$/;

export const validateId = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = request.params.id as string;

  if (!id.match(idPattern)) {
    response
      .status(Status.BAD_REQUEST)
      .json({
        success: false,
        status: Status.BAD_REQUEST,
        message: "Invalid id",
      });
    return;
  }

  next();
};
