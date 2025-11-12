import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const adminServices = {
  getUserActiveStatusCount: () =>
    instance.get(`${endpoint.ADMIN}/userstatus-count`),
  getUserContentCount: () =>
    instance.get(`${endpoint.ADMIN}/usercontent-count`),
};

export default adminServices;
