import { Request, Response } from 'express';
import { fetchOneWithMoreParams } from '@services';
import { ActivityModel } from '@models';
import { Status } from '@utils';

export const updateActivity = async (request: Request, response: Response) => {
  try {
    const {
      params: { id },
      body: { isChecked, todo, note },
    } = request;

    const userId = request.user.id as string;

    const { success, status, message } = await fetchOneWithMoreParams({
      model: ActivityModel,
      searchParams: { _id: id, owner: userId },
    });

    if (!success) {
      response.status(status).json({ success, message });
      return;
    }

    const newActivity = await ActivityModel.findByIdAndUpdate(id);

    if (newActivity) {
      newActivity.isChecked = isChecked ?? newActivity.isChecked;
      newActivity.todo = todo ?? newActivity.todo;
      newActivity.note = note ?? newActivity.note;
      newActivity.updatedAt = new Date().toISOString();
      
      await newActivity.save();
      response
        .status(Status.SUCCESS)
        .json({ success: true, message: 'Todo/Activity updated' });
    }
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to edit todo/activities' });
  }
};
