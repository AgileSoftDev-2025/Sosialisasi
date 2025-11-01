import authServices from "@/services/auth.service";
import { IEditProfile } from "@/types/Auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToasterContext } from "@/contexts/ToasterContext";
import * as yup from "yup";

const editProfileSchema = yup.object().shape({
  fullName: yup.string(),
  jurusan: yup.string(),
  universitas: yup.string(),
  status: yup.string().oneOf(["Mahasiswa", "Dosen"]),
});

const useEditProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);

  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: authServices.getProfile,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      fullName: "",
      universitas: "",
      jurusan: "",
      status: "Mahasiswa",
    },
  });

  useEffect(() => {
    if (profileData) {
      const u = profileData.data.data;
      reset({
        fullName: u.fullName,
        universitas: u.universitas,
        jurusan: u.jurusan,
        status: u.status,
      });
    }
  }, [profileData, reset]);

  const { mutate: mutateEditProfile, isPending: isPendingEditProfile } =
    useMutation({
      mutationFn: authServices.editProfile,
      onSuccess: () => {
        setToaster({
          type: "success",
          message: "Edit Profile Success",
        });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        router.push("/dashboard/profile");
      },
      onError: (error: any) => {
        setToaster({
          type: "error",
          message: error.response?.data?.message || "Gagal memperbarui profil.",
        });
      },
    });

  const handleEditProfile: any = (data: IEditProfile) => {
    const filteredData: any = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== "" && v !== null),
    );
    if (Object.keys(filteredData).length > 0) {
      mutateEditProfile(filteredData);
    } else {
      setToaster({
        type: "info",
        message: "Tidak ada perubahan untuk disimpan.",
      });
    }
  };
  return {
    control,
    handleSubmit,
    handleEditProfile,
    isLoadingProfile,
    isPendingEditProfile,
    errors,
    isDirty,
    handleCancel: () => router.push("/dashboard/profile"),
  };
};

export default useEditProfile;
