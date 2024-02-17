import { Request, Response } from "express";
import { Status } from "@utils";
import { MessageModel } from "@models";

export const sendMessage = async (request: Request, response: Response) => {
  try {
    const sendAMessage = new MessageModel(request.body);
    await sendAMessage.save();
    response
      .status(Status.CREATED)
      .json({ status: Status.CREATED, success: true, message: "Message sent" });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({
        status: Status.SERVER_ERROR,
        success: false,
        message: "Failed to send message",
      });
  }
};
