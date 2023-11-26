import { Request, Response } from 'express';
import { fetchAllWithoutPaginate } from '@services';
import { ActivityModel } from '@models';
import { calculatePercentage } from '@utils';
import { Status } from '@utils';

export const getActivityPercentage = async (
  request: Request,
  response: Response
) => {
  try {
    const owner = request.user.id;
    const isChecked = true;

    const searchQueries = {
      ...(owner && { owner }),
      ...(isChecked && { isChecked }),
    };

    const { status, data, message } = await fetchAllWithoutPaginate({
      model: ActivityModel,
      searchParams: { ...searchQueries },
    });

    response.status(status).json({
      success: status === Status.SUCCESS ? true : false,
      message,
      data: Number(calculatePercentage({
        totalItems: data?.totalItems ?? 0,
        factor: data?.results ? data.results.length : 0,
      }).toFixed(0)),
    });

  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: 'Failed to calculate percentage' });
  }
};
