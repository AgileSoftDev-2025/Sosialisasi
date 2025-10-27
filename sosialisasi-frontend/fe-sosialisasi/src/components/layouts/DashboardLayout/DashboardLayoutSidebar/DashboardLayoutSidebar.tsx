// layouts/DashboardLayout/DashboardLayoutSidebar/DashboardLayoutSidebar.tsx

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
    <aside className="sticky top-[105px] left-0 z-30 flex h-screen w-1/5 flex-col bg-[#FAFAFF] p-4 px-5 py-8 shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]">
      {SIDEBAR_ITEMS.map((item) => (
        <Link href={item.href} key={item.key}>
          <div
            className={cn(
              "flex cursor-pointer flex-row items-center gap-4 rounded-xl p-4 text-[24px] text-[#787878]",
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

      {showCreatePostCard && (
        <div className="mx-5 mt-5 flex flex-col items-center justify-center gap-2 rounded-lg bg-[#E5E7EB]/30 px-7 py-4 text-center">
          <p className="text-[30px]">🚀</p>
          <p className="text-[20px] font-bold text-[#202020]">
            Share Your Journey
          </p>
          <p className="font-regular text-[16px] text-[#787878]">
            Connect with peers and discover amazing opportunities
          </p>
          <button
            onClick={() => router.push("/dashboard/create-post")}
            className="w-full rounded-xl bg-[#5568FE] py-2 text-[18px] font-medium text-white hover:bg-[#5568FE]/80 focus:outline-none"
          >
            Create Post
          </button>
        </div>
      )}
    </aside>
  );
};

export default DashboardLayoutSidebar;
