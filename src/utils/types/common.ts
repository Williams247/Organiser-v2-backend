import { Model, AnyExpression } from "mongoose";
import { Status } from "./default";

export interface FetchProps {
  model: Model<AnyExpression>;
  page?: unknown;
  limit?: unknown;
  searchParams?: {};
  populate?: string | string[];
}

export interface FetchByIdProps {
  model: Model<AnyExpression>;
  id: string | undefined;
}

export interface fetchOneWithMoreParamsProps {
  model: Model<AnyExpression>;
  searchParams: {};
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
