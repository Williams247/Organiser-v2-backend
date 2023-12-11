import mogoose from 'mongoose';
import { UserPayload } from '@utils';

const Schema = mogoose.Schema;

const user = new Schema<UserPayload>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  image: String,
  disabled: Boolean
});

export const UserModel = mogoose.model('user', user);
