import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import contentServices from "@/services/content.service";
import { useRouter } from "next/router";
import { ObjectSchema } from "yup";

interface ICreateForm {
  text_content: string;
  type_content: "All" | "Competition" | "Project";
  file?: FileList;
}

const schema: ObjectSchema<ICreateForm> = yup.object({
  text_content: yup.string().required("Deskripsi post tidak boleh kosong"),
  type_content: yup
    .string()
    .oneOf(["All", "Competition", "Project"])
    .required(),
  file: yup.mixed<FileList>().optional(),
});

const useCreatePage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    watch,
    reset,
  } = useForm<ICreateForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      text_content: "",
      type_content: "All",
    },
  });

  const fileWatch = watch("file");
  const preview = useMemo(() => {
    return fileWatch && fileWatch[0] ? URL.createObjectURL(fileWatch[0]) : null;
  }, [fileWatch]);

  const { mutate: mutateCreateContent, isPending } = useMutation({
    mutationFn: contentServices.createContent,
    onSuccess: (data) => {
      alert(data.message || "Post berhasil dibuat!");
      reset();
      router.push("/dashboard/home");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleCreatePost = (data: ICreateForm) => {
    const formData = new FormData();
    formData.append("text_content", data.text_content);
    formData.append("type_content", data.type_content);
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    mutateCreateContent({ formData });
  };

  return {
    control,
    errors,
    preview,
    isPending,
    handleSubmitForm,
    handleCreatePost,
  };
};

export default useCreatePage;
