import { IUser } from "@/types/User";

export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  created_at_message: string;
  status_message: boolean;
}

export interface IConversation {
  _id: string;
  user: IUser;
  lastMessage: string;
  time: string;
}
