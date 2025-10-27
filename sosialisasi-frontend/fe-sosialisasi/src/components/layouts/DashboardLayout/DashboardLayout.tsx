import React from "react";
import DashboardLayoutNavbar from "./DashboardLayoutNavbar";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";

interface IPropTypes {
  children: React.ReactNode;
  showSearch?: boolean;
  showCreatePostCard?: boolean;
}

const DashboardLayout = ({
  children,
  showSearch,
  showCreatePostCard,
}: IPropTypes) => {
  return (
    <main className="h-screen w-screen overflow-x-hidden bg-[#FAFAFF]">
      <DashboardLayoutNavbar showSearch={showSearch} />
      <div className="flex flex-1 flex-row">
        <DashboardLayoutSidebar showCreatePostCard={showCreatePostCard} />
        <section className="flex h-full w-4/5 flex-col items-center overflow-y-auto">
          {children}
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
