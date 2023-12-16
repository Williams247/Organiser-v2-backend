import mogoose from 'mongoose';
import { OtpProps } from '@utils';

const Schema = mogoose.Schema;

const otp = new Schema<OtpProps>({
  code: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

otp.set('timestamps', true);

export const OtpModel = mogoose.model('otp', otp);
