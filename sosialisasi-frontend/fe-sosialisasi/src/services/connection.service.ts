import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IConnection, IUser } from "@/types/Home";

const connectionServices = {
  toggleConnection: (targetUserId: string, action?: string) =>
    instance
      .post<{
        message: string;
        data?: any;
      }>(`${endpoint.CONNECT}/${targetUserId}`)
      .then((res) => res.data),

  acceptConnection: (requesterId: string) =>
    instance
      .patch<{
        message: string;
        data?: any;
      }>(`${endpoint.CONNECT}/${requesterId}`)
      .then((res) => res.data),

  rejectConnection: (requesterId: string) =>
    instance
      .patch<{
        message: string;
        data?: any;
      }>(`${endpoint.CONNECT}/rejected/${requesterId}`)
      .then((res) => res.data),

  getConnections: () =>
    instance
      .get<{ data: IConnection[] }>(`${endpoint.CONNECT}`)
      .then((res) => res.data.data),

  getPendingConnections: () =>
    instance
      .get<{ data: IConnection[] }>(`${endpoint.CONNECT}/pending`)
      .then((res) => res.data.data),

  getSuggestions: () =>
    instance
      .get<{ data: IUser[] }>(`${endpoint.CONNECT}/suggestions`)
      .then((res) => res.data.data),
  removeConnection: (targetUserId: string) =>
    instance
      .delete<{ message: string }>(`${endpoint.CONNECT}/${targetUserId}`)
      .then((res) => res.data),
};

export default connectionServices;
