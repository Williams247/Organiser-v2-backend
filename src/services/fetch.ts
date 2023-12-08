import {
  ServiceResponsePayload,
  FetchSingleResourcePayload,
  Status,
} from "@utils";

import {
  FetchProps,
  FetchByIdProps,
  fetchOneWithMoreParamsProps,
} from "../utils";

export const fetchAll = async ({
  model,
  page,
  limit,
  searchParams,
  populate,
}: FetchProps): Promise<ServiceResponsePayload> => {
  try {
    const pageReq = Number(page ?? 1);
    const limitReq = Number(limit ?? 5);

    const pageValue = pageReq === 0 ? 1 : pageReq;
    const limitValue = limitReq === 0 ? 5 : limitReq;

    const responseData = await model
      .find({ ...searchParams })
      .skip((pageValue - 1) * pageValue)
      .limit(limitValue)
      .populate(populate ?? "")
      .select("-password");

    const count = await model.count();

    if (!responseData) {
      return {
        status: Status.NOT_FOUND,
        success: false,
        message: "Resource not found",
        data: null,
      };
    }

    return {
      status: Status.SUCCESS,
      success: true,
      message: "Success",
      data: {
        totalItems: count,
        currentPage: pageValue,
        pages: Math.ceil(count / limitValue),
        results: responseData,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const fetchAllWithoutPaginate = async ({
  model,
  searchParams,
  populate,
}: FetchProps): Promise<ServiceResponsePayload> => {
  const responseData = await model
    .find({ ...searchParams })
    .populate(populate ?? "")
    .select("-password");

  const count = await model.count();

  console.log(count, "count");

  if (!responseData) {
    return {
      status: Status.NOT_FOUND,
      success: false,
      message: "Resource not found",
      data: null,
    };
  }

  return {
    status: Status.SUCCESS,
    success: true,
    message: "Success",
    data: {
      totalItems: count,
      results: responseData,
    },
  };
};

export const fetchById = async ({
  model,
  id,
}: FetchByIdProps): Promise<FetchSingleResourcePayload> => {
  try {
    const data = await model.findById(id).select("-password");
    if (!data) {
      return {
        status: Status.NOT_FOUND,
        success: false,
        message: "Resource not found",
        data: null,
      };
    }

    return {
      status: Status.SUCCESS,
      success: true,
      message: "Success",
      data,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchOneWithMoreParams = async ({
  model,
  searchParams,
}: fetchOneWithMoreParamsProps) => {
  try {
    const data = await model.findOne(searchParams).select("-password");
    if (!data) {
      return {
        status: Status.NOT_FOUND,
        success: false,
        message: "Resource not found",
        data: null,
      };
    }

    return {
      status: Status.SUCCESS,
      success: true,
      message: "Success",
      data,
    };
  } catch (error) {
    throw error;
  }
};
