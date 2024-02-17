import mogoose from "mongoose";
import { MessagePayload } from "@utils";

const Schema = mogoose.Schema;

const message = new Schema<MessagePayload>({
  email: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

message.set("timestamps", true);

export const MessageModel = mogoose.model("message", message);
