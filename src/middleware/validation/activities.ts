import { Request, Response, NextFunction } from 'express';
import { ActivitiesPayload, Status } from '@utils';
import Joi from 'joi';

export const validateActivity = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<ActivitiesPayload>({
    todo: Joi.string().required().label('Todo'),
    note: Joi.string().optional().allow("").label('Note'),
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response
      .status(Status.BAD_REQUEST)
      .json({ success: false, message: error.message });
    return;
  }

  next();
};

export const validateUpdateActivity = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schema = Joi.object<ActivitiesPayload>({
    isChecked: Joi.boolean().required().label('isChecked'),
    todo: Joi.string().required().label("Todo"),
    note: Joi.string().optional().allow("").label("Note")
  });

  const { error } = schema.validate(request.body);

  if (error) {
    response
      .status(Status.BAD_REQUEST)
      .json({ success: false, message: error.message });
    return;
  }

  next();
};
