import { Button } from "@heroui/react";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="grid h-screen w-full lg:grid-cols-5">
      <div className="col-span-full flex h-full flex-col items-start justify-center bg-[#122C49] px-6 sm:px-10 md:px-16 lg:col-span-2 lg:px-[6.25rem]">
        <h1 className="mb-2 text-left text-2xl font-bold text-white">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-base text-white">
          {status === "success"
            ? "Thank you for register your account"
            : "Your account failed to activate"}
        </p>
        <Button
          className="mt-6 w-fit bg-[#CEB07E]"
          onPress={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
      <div className="hidden h-full w-full overflow-hidden lg:col-span-3 lg:block">
        <img
          src={
            status === "success"
              ? "/images/activation_success.jpg"
              : "/images/activation_failed.jpg"
          }
          alt={status === "success" ? "success" : "failed"}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Activation;
