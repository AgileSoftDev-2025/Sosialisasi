import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IMessage, IConversation } from "@/types/Message";

const messageServices = {
  sendMessage: (receiverId: string, text: string) =>
    instance
      .post<{
        message: string;
        data: IMessage;
      }>(`${endpoint.MESSAGE}/${receiverId}`, { text })
      .then((res) => res.data.data),

  getMessages: (receiverId: string) =>
    instance
      .get<{ data: IMessage[] }>(`${endpoint.MESSAGE}/${receiverId}`)
      .then((res) => res.data.data),
};

export default messageServices;
