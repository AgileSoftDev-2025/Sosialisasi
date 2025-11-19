import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IUserAdmin, IUserFilters } from "@/types/Admin";
import { IUser } from "@/types/Home";

const adminServices = {
  getUserActiveStatusCount: () =>
    instance.get(`${endpoint.ADMIN}/userstatus-count`),
  getUserContentCount: () =>
    instance.get(`${endpoint.ADMIN}/usercontent-count`),
  getUsers: (filters?: IUserFilters) => {
    const params: any = {};
    if (filters?.status && filters.status !== "All") {
      params.status = filters.status;
    }
    if (filters?.isActive && filters.isActive !== "All") {
      params.isActive = filters.isActive;
    }

    return instance
      .get<{ data: IUserAdmin[] }>(`${endpoint.ADMIN}/users`, { params })
      .then((res) => res.data.data);
  },
  toggleUsersStatus: (userId: string) => {
    return instance
      .patch<{
        data: IUserAdmin;
      }>(`${endpoint.ADMIN}/users/${userId}/toggle-status`)
      .then((res) => res.data.data);
  },
};

export default adminServices;
