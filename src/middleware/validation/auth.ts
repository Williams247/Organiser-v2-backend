import { Request, Response, NextFunction } from "express";
import { UserPayload, Role, Status, UpdatePasswordPayload } from "@utils";
import Joi from "joi";

export const validateAuthRegister = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<UserPayload>({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "The two passwords do not match",
        "any.required": "Confirm password is required",
      }),
    image: Joi.string().allow(" ").label("Profile Image"),
    role: Joi.string().required().valid(Role.ADMIN, Role.USER).label("Role"),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response.status(Status.BAD_REQUEST).json({
      success: false,
      status: Status.BAD_REQUEST,
      message: error.message,
    });
    return;
  }

  next();
};

export const validateAuthLogin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<UserPayload>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response.status(Status.BAD_REQUEST).json({
      success: false,
      status: Status.BAD_REQUEST,
      message: error.message,
    });
    return;
  }

  next();
};

export const validateRecoverPassword = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<UserPayload>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response.status(Status.BAD_REQUEST).json({
      success: false,
      status: Status.BAD_REQUEST,
      message: error.message,
    });
    return;
  }

  next();
};

export const validateUpdatePassword = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<UpdatePasswordPayload>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    otpCode: Joi.string().required().label("otpCode").min(4).max(4),
    password: Joi.string().required().label("Password"),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response.status(Status.BAD_REQUEST).json({
      success: false,
      status: Status.BAD_REQUEST,
      message: error.message,
    });
    return;
  }

  next();
};
