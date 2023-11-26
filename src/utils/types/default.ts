export enum Status {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

export interface UserPayload {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
  verified?: boolean;
  role?: string;
}

export interface ActivitiesPayload {
  _id?: string;
  todo?: string;
  note?: string;
  owner?: string;
  role?: string;
  isChecked?: boolean;
  createdAt?: string;
  updatedAt?: string | null;
}

export enum Role {
  USER = "user",
  ADMIN = "admin",
}
