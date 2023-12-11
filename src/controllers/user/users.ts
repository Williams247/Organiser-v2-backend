import { Request, Response } from "express";
import { Status, Role } from "@utils";
import { fetchAll, fetchById } from "@services";
import { UserModel } from "@models";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const {
      query: { limit, page },
    } = request;

    const { success, status, message, data } = await fetchAll({
      model: UserModel,
      limit,
      page,
      searchParams: { role: Role.USER },
    });

    response.status(status).json({ success, message, data });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch users" });
  }
};

export const enableDisableUser = async (
  request: Request,
  response: Response
) => {
  try {
    const {
      params: { id },
    } = request;

    const { status, success, data, message } = await fetchById({
      model: UserModel,
      id,
    });

    if (!data && status === 404) {
      return response.status(status).json({ success, message, data });
    } else if (data) {
      const user = await UserModel.findByIdAndUpdate(id);
      if (user) {
        user.disabled = !user.disabled;
        await user.save();
        return response.status(Status.SUCCESS).json({
          success: true,
          message: `${
            user.disabled
              ? `${user.firstName}'s account is disabled`
              : `${user.firstName}'s account is enabled`
          }`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: "Failed to modify user status" });
  }
};
