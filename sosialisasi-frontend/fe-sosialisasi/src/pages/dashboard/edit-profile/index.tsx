import Image from "next/image";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/router";
import { FaPencilAlt } from "react-icons/fa";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const page = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col justify-center gap-6 bg-gray-50 p-6 lg:flex-row">
        <div className="mb-6 w-1/2 self-start rounded-2xl border border-gray-200 bg-white px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4">
            <div className="sticky h-28 w-28 rounded-full bg-black object-cover">
              <div className="absolute right-0 bottom-0 rounded-full bg-[#5568FE] p-2">
                <i className="fa-solid fa-camera text-white"></i>
              </div>
            </div>
            <div className="cursor-pointer rounded-xl border border-[#5568FE] px-8 py-3 font-medium text-[#5568FE] hover:bg-[#5568FE] hover:text-white">
              <h3>Change Foto</h3>
            </div>
          </div>

          <form className="flex flex-col gap-8 px-8 py-12">
            <div className="flex flex-col gap-2">
              <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                Full Name
              </h4>
              <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                <input
                  className="w-full text-[18px] focus:outline-none"
                  placeholder="Dafa Fajar Bagaskara"
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                Universitas
              </h4>
              <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                <input
                  className="w-full text-[18px] focus:outline-none"
                  placeholder="Universitas Airlangga"
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                Jurusan
              </h4>
              <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                <input
                  className="w-full text-[18px] focus:outline-none"
                  placeholder="Sistem Informasi"
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[18px] font-medium text-[#7A7A7A]">
                Linked In
              </h4>
              <div className="rounded-2xl border border-[#E6E3DF] px-5 py-4">
                <input
                  className="w-full text-[18px] focus:outline-none"
                  placeholder="https://linkedin.com/in/DafaFajarBagaskara"
                />
              </div>
            </div>
            <button className="mt-8 cursor-pointer rounded-2xl bg-[#5568FE] p-5 text-[20px] font-bold text-white">
              Simpan Perubahan
            </button>

            <button className="-mt-6 cursor-pointer p-5 text-center text-[20px] font-bold text-[#7A7A7A]">
              Batalkan
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
