import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
  userName: yup.string().required("Please input your username"),
  fullName: yup.string().required("Please input your fullname"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .required("Please input your password")
    .min(6, "Password minimal 6 karakter")
    .test(
      "at-least-one-uppercase-letter",
      "Password setidaknya memiliki 1 huruf kapital",
      (value) => {
        if (!value) return false;
        return /[A-Z]/.test(value);
      },
    )
    .test(
      "at-least-one-number",
      "Password setidaknya memiliki 1 angka",
      (value) => {
        if (!value) return false;
        return /[0-9]/.test(value);
      },
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not match")
    .required("Please input your confirmation password"),
});

const useRegister = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const [visiblePassword, setVissiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVissiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Register Success",
      });
      router.push("/auth/register/success");
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
