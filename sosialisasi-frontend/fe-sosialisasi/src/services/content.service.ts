import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPost } from "@/types/Home";

const contentServices = {
  getAllPosts: () =>
    instance
      .get<{ data: IPost[] }>(endpoint.CONTENT)
      .then((res) => res.data.data),
  createContent: (formData: FormData) =>
    instance.post(endpoint.CONTENT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  toggleLike: (postId: string) =>
    instance.post(`${endpoint.LIKE_TOGGLE}/${postId}`),
};

export default contentServices;
