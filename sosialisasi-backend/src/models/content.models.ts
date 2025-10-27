import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface Content {
  text_content: string;
  attachmentUrl_content?: string;
  created_at_content: Date;
  status_content: boolean;
  type_content: string;
  userId: mongoose.Types.ObjectId;
}

const ContentSchema = new Schema<Content>(
  {
    text_content: {
      type: Schema.Types.String,
      required: true,
    },
    attachmentUrl_content: {
      type: Schema.Types.String,
    },
    created_at_content: {
      type: Schema.Types.Date,
      required: true,
    },
    status_content: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    type_content: {
      type: Schema.Types.String,
      required: true,
      default: "All",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContentModel = mongoose.model("Content", ContentSchema);

export default ContentModel;
