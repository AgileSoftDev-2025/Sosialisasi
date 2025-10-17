import { useState } from "react";
import { Form, Input, Checkbox, Button } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import useRegister from "../Register/useRegister";

const Login = () => {
  const { visiblePassword, handleVisiblePassword } = useRegister();

  return (
    <div className="grid h-screen w-full lg:grid-cols-5">
      <div className="col-span-full flex h-full flex-col items-start justify-center gap-5 bg-[#122C49] px-6 sm:px-10 md:px-16 lg:col-span-2 lg:px-[6.25rem]">
        <h1 className="text-left text-2xl font-bold text-white">
          Welcome Back!
        </h1>
        <p className="text-base text-white">Please login to continue</p>
        <div className="w-full">
          <Form className="w-full items-center justify-center space-y-4">
            <div className="flex w-full flex-col gap-4">
              <Input
                isRequired
                label="Email"
                labelPlacement="inside"
                name="email"
                placeholder="Enter your email"
                type="email"
              />

              <Input
                isRequired
                label="Password"
                labelPlacement="inside"
                name="password"
                placeholder="Enter your password"
                type={visiblePassword.password ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => handleVisiblePassword("password")}
                  >
                    {visiblePassword.password ? (
                      <FaRegEye className="text-default-400 pointer-events-none text-xl" />
                    ) : (
                      <FaRegEyeSlash className="text-default-400 pointer-events-none text-xl" />
                    )}
                  </button>
                }
              />

              <div className="flex gap-4 pt-2">
                <Button className="w-full bg-[#CEB07E]" type="submit">
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <p className="w-full pt-2 text-center text-base text-white">
          Not a member?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-[#CEAE78] hover:underline"
          >
            Register now
          </Link>
        </p>
      </div>
      <div className="hidden h-full w-full overflow-hidden lg:col-span-3 lg:block">
        <img
          src="/images/auth_picture.webp"
          alt="auth_picture"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
