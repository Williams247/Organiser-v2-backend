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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  role: {
    type: String,
    required: true,
  }
});

activity.set('timestamps', true);

export const ActivityModel = mogoose.model('activity', activity);
