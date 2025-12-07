import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: string;
}

interface IPropTypes {
  sidebarItems: SidebarItem[];
}

const DashboardLayoutSidebar = ({ sidebarItems }: IPropTypes) => {
  const router = useRouter();

  return (
    <aside className={cn(
    "flex h-full flex-col overflow-y-auto bg-white p-4 px-4 py-6 shadow-md sm:px-5 sm:py-8 md:w-64 lg:w-72",
    router.pathname === "/dashboard/messages" ? "w-24 md:w-24 lg:w-24" : "w-64 md:w-64 lg:w-72"
  )}>
      <div className="flex flex-col gap-1">
        {sidebarItems.map((item) => (
          <Link href={item.href} key={item.key}>
            <div
              className={cn(
                "flex cursor-pointer flex-row items-center gap-3 rounded-xl p-3 text-base text-[#787878] transition-colors hover:bg-gray-50 sm:gap-4 sm:p-4 sm:text-lg lg:text-xl",
                {
                  "bg-[#5568FE] text-white hover:bg-[#5568FE]/90":
                    router.pathname === item.href,
                }
              )}
            >
              <i className={item.icon}></i>
              {router.pathname !== "/dashboard/messages" && (
                <h3 className="font-medium">{item.label}</h3>
              )}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default DashboardLayoutSidebar;
