import { Request, Response } from 'express';
import { UserModel } from '@models';
import { fetchById } from '@services';
import { Status } from '@utils';

export const getProfile = async (request: Request, response: Response) => {
  try {
    const { success, message, status, data } = await fetchById({
      model: UserModel,
      id: request.user.id,
    });

    response.status(status).json({ message, success, data });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to get profile' });
  }
};
