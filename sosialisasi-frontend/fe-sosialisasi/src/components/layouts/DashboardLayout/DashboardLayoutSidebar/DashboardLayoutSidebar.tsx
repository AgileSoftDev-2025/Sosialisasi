import { useRouter } from "next/router";
import Link from "next/link";
import { SIDEBAR_ITEMS } from "../DashboardLayout.constants";
import { cn } from "@/utils/cn";

interface IPropTypes {
  showCreatePostCard?: boolean;
}

const DashboardLayoutSidebar = ({ showCreatePostCard = false }: IPropTypes) => {
  const router = useRouter();

  return (
    <aside className="sticky top-0 left-0 flex h-screen w-40 flex-col overflow-y-auto bg-white p-4 px-5 py-8 shadow-md md:flex md:w-64 lg:w-72">
      <div>
        {SIDEBAR_ITEMS.map((item) => (
          <Link href={item.href} key={item.key}>
            <div
              className={cn(
                "flex cursor-pointer flex-row items-center gap-4 rounded-xl p-4 text-lg text-[#787878] lg:text-xl",
                {
                  "bg-[#5568FE] text-white": router.pathname === item.href,
                },
              )}
            >
              <i className={item.icon}></i>
              <h3 className="font-regular">{item.label}</h3>
            </div>
          </Link>
        ))}
      </div>

      {showCreatePostCard && (
        <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-lg bg-[#E5E7EB]/30 px-4 py-4 text-center">
          <p className="text-2xl">🚀</p>
          <p className="text-lg font-bold text-[#202020]">Share Your Journey</p>
          <p className="text-sm text-[#787878]">
            Connect with peers and discover amazing opportunities
          </p>
          <button
            onClick={() => router.push("/dashboard/create-post")}
            className="w-full rounded-xl bg-[#5568FE] py-2 text-base font-medium text-white hover:bg-[#5568FE]/80 focus:outline-none"
          >
            Create Post
          </button>
        </div>
      )}
    </aside>
  );
};

export default DashboardLayoutSidebar;
