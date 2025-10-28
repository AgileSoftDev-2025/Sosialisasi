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
    <main className="flex min-h-screen flex-col bg-[#FAFAFF]">
      <DashboardLayoutNavbar showSearch={showSearch} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardLayoutSidebar showCreatePostCard={showCreatePostCard} />
        <section className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
