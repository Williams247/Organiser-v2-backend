import { Request, Response, NextFunction } from 'express';

export const idPattern = /^[0-9a-fA-F]{24}$/;

export const validateId = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = request.params.id as string;

  if (!id.match(idPattern)) {
    response.status(422).json({ success: false, message: 'Invalid id' });
    return;
  }

  next();
};
