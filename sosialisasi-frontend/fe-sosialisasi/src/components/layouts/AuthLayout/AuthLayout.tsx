import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface PropTypes {
  title?: string;
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10">
      <PageHead title={title} />
      <section className="min-h-screen w-full">{children}</section>
    </div>
  );
};

export default AuthLayout;
