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
    <main className="flex h-screen flex-col overflow-hidden bg-[#FAFAFF]">
      <DashboardLayoutNavbar showSearch={showSearch} />
      <div className="flex h-screen overflow-hidden">
        <DashboardLayoutSidebar showCreatePostCard={showCreatePostCard} />
        <section className="flex w-full flex-1 justify-center overflow-y-auto p-6 md:p-8">
          {children}
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
