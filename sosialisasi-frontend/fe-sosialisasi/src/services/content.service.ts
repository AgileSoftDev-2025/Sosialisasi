import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const contentServices = {
  createContent: (formData: FormData) =>
    instance.post(endpoint.CONTENT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default contentServices;
