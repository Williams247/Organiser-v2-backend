import { Request, Response } from 'express';
import { ActivitiesPayload, Status } from '@utils';
import { ActivityModel } from '@models';

export const createActivties = async (request: Request, response: Response) => {
  try {
    const {
      body: { todo, note },
    } = request;
    const createActivty = new ActivityModel<ActivitiesPayload>({
      owner: request.user.id,
      todo: todo,
      note,
      role: request.user.role,
      isChecked: false,
    });
    await createActivty.save();
    response
      .status(Status.CREATED)
      .json({ success: true, message: 'Activity created' });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to create activity/todo.' });
  }
};
