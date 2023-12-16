import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { UserPayload, Status } from "@utils";

export const validateProfile = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<UserPayload>({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    password: Joi.string()
      .min(3)
      .max(30)
      .optional()
      .allow("")
      .label("Password"),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .optional()
      .allow("")
      .label("Confirm Password"),
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
