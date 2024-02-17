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
  countParams,
  selectParms,
}: FetchProps): Promise<ServiceResponsePayload> => {
  try {
    const pageRequest = Number(page ?? 1);
    const limitRequest = Number(limit ?? 10);

    const count = await model.countDocuments(countParams ?? {});

    const responseData = await model
      .find({ ...searchParams })
      .skip((pageRequest - 1) * limitRequest)
      .limit(limitRequest)
      .populate(populate ?? "")
      .select(selectParms ?? "-password");

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
        currentPage: pageRequest,
        pages: Math.ceil(count / limitRequest),
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
  countParams,
  selectParms,
}: FetchProps): Promise<ServiceResponsePayload> => {
  const responseData = await model
    .find({ ...searchParams })
    .populate(populate ?? "")
    .select(selectParms ?? "-password");

  const count = await model.countDocuments(countParams ?? {});

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
  selectParms,
}: fetchOneWithMoreParamsProps) => {
  try {
    const data = await model
      .findOne(searchParams)
      .select(selectParms ?? "-password");
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
