import { Request, Response } from "express";
import { Status } from "@utils";
import { MessageModel } from "@models";
import { fetchById } from "@services";

export const deleteAMessage = async (request: Request, response: Response) => {
  try {
    const {
      params: { id },
    } = request;

    const { success, status, message } = await fetchById({
      model: MessageModel,
      id,
    });

    if (!success) {
      response.status(status).json({ status, success, message });
      return;
    }

    await MessageModel.findByIdAndDelete(id);

    response.status(Status.SUCCESS).json({
      status: Status.SUCCESS,
      success: true,
      message: "Message deleted",
    });
  } catch (error) {
    console.log(error);
    response.status(Status.SERVER_ERROR).json({
      status: Status.SERVER_ERROR,
      success: false,
      message: "Failed to send message",
    });
  }
};

export const deleteAllMessages = async (
  request: Request,
  response: Response
) => {
  try {
    await MessageModel.deleteMany();
    response
      .status(Status.SUCCESS)
      .json({
        status: Status.SUCCESS,
        success: true,
        message: "All message deleted",
      });
  } catch (error) {
    console.log(error);
    response.status(Status.SERVER_ERROR).json({
      status: Status.SERVER_ERROR,
      success: false,
      message: "Failed to delete all message",
    });
  }
};
