import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Form, Input, Checkbox, Button, Spinner } from "@heroui/react";
import useRegister from "./useRegister";
import Link from "next/link";
import { Controller } from "react-hook-form";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();
  return (
    <div className="grid h-screen w-full lg:grid-cols-5">
      <div className="col-span-full flex h-full flex-col items-start justify-center gap-5 bg-[#122C49] px-6 sm:px-10 md:px-16 lg:col-span-2 lg:px-[6.25rem]">
        <h1 className="text-left text-2xl font-bold text-white">
          Join Sosialisasi
        </h1>
        <p className="text-base text-white">
          Find the best internship and job opportunities tailored for
          Information Systems students of Airlangga University!
        </p>
        <div className="w-full">
          <Form
            onSubmit={handleSubmit(handleRegister)}
            className="w-full items-center justify-center space-y-4"
          >
            <div className="flex w-full flex-col gap-4">
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Username"
                    labelPlacement="inside"
                    placeholder="Enter your name"
                    isInvalid={errors.userName !== undefined}
                    errorMessage={errors.userName?.message}
                  />
                )}
              />
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Full Name"
                    labelPlacement="inside"
                    placeholder="Enter your name"
                    isInvalid={errors.fullName !== undefined}
                    errorMessage={errors.fullName?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Email"
                    labelPlacement="inside"
                    placeholder="Enter your email"
                    type="email"
                    isInvalid={errors.email !== undefined}
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Password"
                    labelPlacement="inside"
                    placeholder="Enter your password"
                    type={visiblePassword.password ? "text" : "password"}
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
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
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Confirm Password"
                    labelPlacement="inside"
                    placeholder="Enter your password"
                    isInvalid={errors.confirmPassword !== undefined}
                    errorMessage={errors.confirmPassword?.message}
                    type={visiblePassword.confirmPassword ? "text" : "password"}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("confirmPassword")}
                      >
                        {visiblePassword.confirmPassword ? (
                          <FaRegEye className="text-default-400 pointer-events-none text-xl" />
                        ) : (
                          <FaRegEyeSlash className="text-default-400 pointer-events-none text-xl" />
                        )}
                      </button>
                    }
                  />
                )}
              />
              {/* 
              <Input
                isRequired
                label="Add Student Card"
                labelPlacement="inside"
                name="studentCard"
                type="file"
              /> */}

              <div className="flex gap-4 pt-2">
                <Button className="w-full bg-[#CEB07E]" type="submit">
                  {isPendingRegister ? (
                    <Spinner color="white" size="sm"></Spinner>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
              <p className="w-full text-center text-base text-white">
                Already Have An Account?{" "}
                <Link href="/auth/login" className="text-[#CEAE78]">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </div>
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

export default Register;
