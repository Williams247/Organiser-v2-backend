import { Role, UserPayload } from "@utils";

export interface Props {
  userType?: Role;
  forAllUsers?: boolean;
}

export interface UserProps {
  data: UserPayload;
}
