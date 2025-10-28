import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IContentPayload } from "@/types/Auth";

const contentServices = {
  createContent: async (payload: IContentPayload) => {
    const { formData } = payload;

    const response = await fetch("/api/content", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Gagal membuat post. Silakan coba lagi.",
      );
    }

    return result;
  },
};

export default contentServices;
