import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { renderMailHTML, sendMail } from "../utils/mail/mail";
import { CLIENT_HOST } from "../utils/env";

const Schema = mongoose.Schema;

export interface User {
  _id: mongoose.Types.ObjectId;
}

export interface Content {
  _id: mongoose.Types.ObjectId;
}

export interface Comment {
  id_user: mongoose.Types.ObjectId;
  id_content: mongoose.Types.ObjectId;
  text_comment: string;
  created_at_comment: Date;
}

const CommentSchema = new Schema<Comment>({
  id_user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  id_content: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text_comment: {
    type: Schema.Types.String,
    required: true,
  },
  created_at_comment: {
    type: Schema.Types.Date,
    required: true,
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);

export default CommentModel;
