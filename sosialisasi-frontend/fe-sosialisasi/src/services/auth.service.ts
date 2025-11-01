import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILogin, IActivation, IRegister, IEditProfile } from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  editProfile: (payload: IEditProfile) =>
    instance.put(`${endpoint.AUTH}/edit-profile`, payload),
};

export default authServices;
