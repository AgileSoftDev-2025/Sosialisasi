import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ILogin } from "@/types/Auth";
import authServices from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const loginSchema = yup.object().shape({
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
});

const useLogin = () => {
  const router = useRouter();
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
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const loginService = async (payload: ILogin) => {
    const result = await authServices.login(payload);
    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push("/dashboard");
      reset();
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
