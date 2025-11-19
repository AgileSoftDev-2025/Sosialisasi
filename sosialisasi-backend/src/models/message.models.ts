import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface Message {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  text: string;
  created_at_message: Date;
  status_message: boolean;
}

const MessageSchema = new Schema<Message>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: Schema.Types.String,
      required: true,
    },
    created_at_message: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status_message: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: false,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
