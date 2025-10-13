import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { renderMailHTML, sendMail } from "../utils/mail/mail";
import { CLIENT_HOST } from "../utils/env";

const Schema = mongoose.Schema;

export interface User {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role?: string;
  studentCard: string;
  isActive: boolean;
  activationCode: string;
  createdAt?: string;
}

const UserSchema = new Schema<User>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    userName: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: ["admin", "mahasiswa", "dosen", "alumni"],
      default: "mahasiswa",
    },
    studentCard: {
      type: Schema.Types.String,
      default: "user.jpg",
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = encrypt(user.password);
  user.activationCode = encrypt(user.id);
  next();
});

UserSchema.post("save", async function (doc, next) {
  try {
    const user = doc;
    console.log("Send email to: ", user.email);

    const contentMail = await renderMailHTML("registration-success.ejs", {
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
      activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
    });
    await sendMail({
      from: "kawantani@zohomail.com",
      to: user.email,
      subject: "Activation Akun Anda",
      html: contentMail,
    });
  } catch (error) {
    console.error("Error sending email: ", error);
  } finally {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
