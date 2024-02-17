import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { MessagePayload, Status } from "@utils";

export const validateMessage = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<MessagePayload>({
    email: Joi.string().email().required().label("Email field"),
    from: Joi.string().required().label("From field"),
    message: Joi.string().required().label("Message field")
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response
      .status(Status.BAD_REQUEST)
      .json({
        success: false,
        status: Status.BAD_REQUEST,
        message: error.message,
      });
    return;
  }

  next();
};
