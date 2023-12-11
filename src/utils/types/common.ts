import { Model, AnyExpression } from "mongoose";
import { Status } from "./default";

type selectParmsProps =
  | string
  | string[]
  | Record<string, number | boolean | object>;

export interface FetchProps {
  model: Model<AnyExpression>;
  page?: unknown;
  limit?: unknown;
  searchParams?: {};
  populate?: string | string[];
  countParams?: unknown;
  selectParms?: selectParmsProps;
}

export interface FetchByIdProps {
  model: Model<AnyExpression>;
  id: string | undefined;
}

export interface fetchOneWithMoreParamsProps {
  model: Model<AnyExpression>;
  searchParams: {};
  selectParms?: selectParmsProps;
}

export interface FetchResponsePayload {
  totalItems?: number;
  currentPage?: number;
  pages?: number;
  results: any;
}

export interface ServiceResponsePayload {
  status: Status;
  success: boolean;
  message: string;
  data?: FetchResponsePayload | null;
}

export interface FetchSingleResourcePayload {
  status: Status;
  success: boolean;
  message: string;
  data?: unknown;
}
