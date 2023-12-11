import { Request, Response } from "express";
import { fetchAll } from "@services";
import { ActivityModel } from "@models";
import { Status } from "@utils";

export const getActivities = async (request: Request, response: Response) => {
  try {
    const {
      query: { page, limit, todo, note },
    } = request;

    const owner = request.user.id;

    const searchParamsOptions = () => {
      if (todo) {
        return {
          owner,
          todo: new RegExp(todo as string, "i"),
        };
      } else if (note) {
        return {
          owner,
          note: new RegExp(note as string, "i"),
        };
      } else return { owner };
    };

    const { status, success, message, data } = await fetchAll({
      model: ActivityModel,
      page,
      limit,
      searchParams: { ...searchParamsOptions() },
      countParams: { owner }
    });

    response.status(status).json({ success, message, data });
  } catch (error) {
    console.log(error);
    response
      .status(Status.SERVER_ERROR)
      .json({ success: false, message: "Failed to get activity" });
  }
};
