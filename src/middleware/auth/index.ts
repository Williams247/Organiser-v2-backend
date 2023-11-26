import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { Role, UserPayload, Status } from '@utils';

interface Props {
  userType?: Role;
  forAllUsers?: boolean;
}

export const auth =
  ({ userType, forAllUsers }: Props) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let token = request.headers['authorization'];
      if (!token) {
        response
          .status(Status.UNAUTHORIZED)
          .json({ success: false, message: 'Unauthorized' });
        return;
      }

      if (!token.startsWith('Bearer ')) {
        response
          .status(Status.UNAUTHORIZED)
          .json({ success: false, message: 'Token must have a bearer prefix' });
        return;
      }

      token = token.slice(7, token.length);
      const authorized = (await JWT.verify(
        token,
        process.env.SECRET as string
      )) as UserPayload;

      if (forAllUsers) {
        request.user = authorized;
        next();
        return;
      }

      if (authorized.role !== userType) {
        return response
          .status(Status.UNAUTHORIZED)
          .json({ success: false, message: 'Unauthorized' });
      }

      request.user = authorized;
      next();
    } catch (error) {
      response
        .status(Status.SERVER_ERROR)
        .json({ success: false, message: 'Token is invalid or expired' });
      console.log(error);
    }
  };
