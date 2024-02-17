import { Request, Response } from "express";
import { Status } from "@utils";
import { fetchAll } from "@services";
import { MessageModel } from "@models";

export const fetchMessages = async (request: Request, response: Response) => {
  try {
    const {
      query: { page, limit },
    } = request;
    const { status, success, message, data } = await fetchAll({
      model: MessageModel,
      page,
      limit,
    });
    response.status(status).json({ status, success, message, data });
  } catch (error) {
    console.log(error);
    response.status(Status.SERVER_ERROR).json({
      status: Status.SERVER_ERROR,
      success: false,
      message: "Failed to fetch message",
    });
  }
};
