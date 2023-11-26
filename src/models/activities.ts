import mogoose from 'mongoose';
import { ActivitiesPayload } from '@utils';

const Schema = mogoose.Schema;

const activity = new Schema<ActivitiesPayload>({
  todo: {
    type: String,
    required: true,
  },
  note: String,
  isChecked: {
    type: Boolean,
    required: true,
  },
  owner: Schema.Types.ObjectId,
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Mixed,
    required: true,
  },
  updatedAt: Schema.Types.Mixed,
});

export const ActivityModel = mogoose.model('activity', activity);
