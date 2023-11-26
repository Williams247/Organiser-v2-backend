import { Request, Response } from 'express';
import { fetchById, fetchAllWithoutPaginate } from '@services';
import { ActivityModel } from '@models';
import { Status } from '@utils';

export const deleteActivity = async (request: Request, response: Response) => {
  try {
    const ownerId = request.user.id as string;

    const {
      params: { id },
    } = request;

    const { success, status, message } = await fetchById({
      model: ActivityModel,
      id,
    });

    if (!success) {
      response.status(status).json({ success, message });
      return;
    }

    await ActivityModel.findOneAndDelete({ _id: id, owner: ownerId });
    response
      .status(Status.SUCCESS)
      .json({ success: true, message: 'Activity/todo deleted' });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to delete activity/todo.' });
  }
};

export const deleteActivitiesById = async (
  request: Request,
  response: Response
) => {
  const {
    body: { deleteIDs, activityOwnerId },
  } = request;
  
  const filterParams = { $in: deleteIDs };
  
  const ownerId = request.user.id as string;

  if (activityOwnerId !== ownerId) {
    response
      .status(Status.FORBIDDEN)
      .json({
        success: false,
        message: 'You are not allowed to take this action',
      });
    return;
  }

  try {
    const { status, success, data, message } = await fetchAllWithoutPaginate({
      model: ActivityModel,
      searchParams: { _id: filterParams },
    });

    if (status !== Status.SUCCESS && success === false && !data) {
      response.status(status).json({ success, message });
      return;
    }

    await ActivityModel.deleteMany({
      _id: filterParams,
      owner: ownerId,
    });
    response
      .status(Status.SUCCESS)
      .json({ success: true, message: 'Activities/todos deleted' });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to delete activities/todo.' });
  }
};

export const deleteAllActivities = async (
  request: Request,
  response: Response
) => {
  try {
    const ownerId = request.user.id as string;
    await ActivityModel.deleteMany({ owner: ownerId });
    response
      .status(Status.SUCCESS)
      .json({ success: true, message: 'Activities/todo deleted' });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to delete activities/todo.' });
  }
};
