import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { renderMailHTML, sendMail } from "../utils/mail/mail";
import { CLIENT_HOST } from "../utils/env";

const Schema = mongoose.Schema;

export interface Content {
    text_content: string;
    attachmentUrl_content?: string;
    created_at_content: Date;
    status_content: boolean;
}

const ContentSchema = new Schema<Content>(
    {
        text_content: {
            type: Schema.Types.String,
            required: true
        },
        attachmentUrl_content: {
            type: Schema.Types.String,
        },
        created_at_content: {
            type: Schema.Types.Date,
            required: true
        },
        status_content: {
            type: Schema.Types.Boolean,
            required: true,
            default: false,
        }
    }
);

const ContentModel = mongoose.model("Content", ContentSchema);

export default ContentModel;