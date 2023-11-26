import { Request, Response } from 'express';
import { fetchById } from '@services';
import { ActivityModel } from '@models';
import { Status } from '@utils';

export const getActivity = async (request: Request, response: Response) => {
  try {
    const {
      params: { id },
    } = request;
    const { status, success, message, data } = await fetchById({
      model: ActivityModel,
      id,
    });

    response.status(status).json({ success, message, data });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to get activity' });
  }
};
