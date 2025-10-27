import Image from "next/image";

interface IPropTypes {
  showSearch?: boolean;
}

const DashboardLayoutNavbar = ({ showSearch = false }: IPropTypes) => {
  return (
    <nav className="sticky top-0 z-40 flex w-full flex-row justify-between bg-white p-5 shadow-md">
      <div className="flex flex-row items-center gap-2">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <h1 className="text-[32px] font-bold">Sosialisasi</h1>
      </div>

      {showSearch && (
        <div className="flex w-1/2 flex-row items-center gap-4 rounded-3xl border-2 border-[#E5E7EB] bg-[#FAFAFF] px-5 py-2">
          <i className="fas fa-search text-[20px] text-[#787878]"></i>
          <input
            className="w-full bg-transparent text-[20px] placeholder-[#ADAEBC] focus:outline-none"
            placeholder="Search Post, People, Opportunities.."
          />
        </div>
      )}

      <div className="flex flex-row items-center gap-7">
        <div className="cursor-pointer rounded-xl bg-[#FAFAFF] p-4">
          <i className="fas fa-filter text-[20px] text-[#787878]"></i>
        </div>
        <div className="cursor-pointer rounded-xl bg-[#FAFAFF] p-4">
          <i className="fas fa-bell text-[20px] text-[#787878]"></i>
        </div>
        <div className="cursor-pointer rounded-xl bg-black p-5"></div>
      </div>
    </nav>
  );
};

export default DashboardLayoutNavbar;
