import Image from "next/image";

interface IPropTypes {
  showSearch?: boolean;
}

const DashboardLayoutNavbar = ({ showSearch = false }: IPropTypes) => {
  return (
    <nav className="sticky top-0 z-50 flex w-full flex-row items-center justify-between bg-white p-4 shadow-md sm:p-5">
      <div className="flex flex-row items-center gap-2">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <h1 className="text-2xl font-bold sm:text-3xl">Sosialisasi</h1>
      </div>

      {showSearch && (
        <div className="hidden w-1/3 flex-row items-center gap-4 rounded-3xl border-2 border-[#E5E7EB] bg-[#FAFAFF] px-5 py-2 md:flex lg:w-1/2">
          <i className="fas fa-search text-lg text-[#787878]"></i>
          <input
            className="w-full bg-transparent text-lg placeholder-[#ADAEBC] focus:outline-none"
            placeholder="Search Post, People, Opportunities.."
          />
        </div>
      )}

      <div className="flex flex-row items-center gap-4 sm:gap-7">
        <div className="cursor-pointer rounded-xl bg-[#FAFAFF] p-3 sm:p-4">
          <i className="fas fa-filter text-lg text-[#787878]"></i>
        </div>
        <div className="cursor-pointer rounded-xl bg-[#FAFAFF] p-3 sm:p-4">
          <i className="fas fa-bell text-lg text-[#787878]"></i>
        </div>
        <div className="h-12 w-12 cursor-pointer rounded-xl bg-black"></div>
      </div>
    </nav>
  );
};

export default DashboardLayoutNavbar;
