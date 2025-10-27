import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const CreatePage = () => {
  const [nyala, setNyala] = useState(0);
  return (
    <DashboardLayout>
      <article className="mt-10 flex w-[80%] flex-col rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-row items-center gap-5 p-3">
          <div className="rounded-xl bg-black p-7"></div>
          <div className="flex flex-col">
            <h3 className="text-[20px] font-medium text-[#202020]">
              Mochamad Javier Elsyera
            </h3>
            <h4 className="font-regular text-[16px] text-[#787878]">
              Information System Student
            </h4>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 p-3">
          <h2 className="text-[20px] font-medium text-[#202020]">
            Choose Category
          </h2>
          <div className="flex flex-row items-center gap-4">
            <div
              className={`flex cursor-pointer flex-row items-center gap-2 rounded-full px-6 py-3 ${
                nyala === 0
                  ? "bg-[#5568FE] text-white"
                  : "bg-[#E5E7EB] text-[#787878]"
              }`}
              onClick={() => setNyala(0)}
            >
              <i className="fa-solid fa-list"></i>
              <p className="text-[16px] font-medium">All</p>
            </div>

            <div
              className={`flex cursor-pointer flex-row items-center gap-2 rounded-full px-6 py-3 ${
                nyala === 1
                  ? "bg-[#FFB27C] text-white"
                  : "bg-[#E5E7EB] text-[#787878]"
              }`}
              onClick={() => setNyala(1)}
            >
              <i className="fa-solid fa-trophy"></i>
              <p className="text-[16px] font-medium">Competition</p>
            </div>

            <div
              className={`flex cursor-pointer flex-row items-center gap-2 rounded-full px-6 py-3 ${
                nyala === 2
                  ? "bg-[#16A34A] text-white"
                  : "bg-[#E5E7EB] text-[#787878]"
              }`}
              onClick={() => setNyala(2)}
            >
              <i className="fa-solid fa-code"></i>
              <p className="text-[16px] font-medium">Project</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 p-3">
          <h2 className="text-[20px] font-medium text-[#202020]">
            Post Description
          </h2>
          <div className="rounded-2xl border border-[#ADAEBC] p-7">
            <textarea
              placeholder="Write something to share…"
              className="h-48 w-full resize-none text-[20px] focus:outline-none"
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 p-3">
          <h2 className="text-[20px] font-medium text-[#202020]">
            Add Pictures
          </h2>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-[#ADAEBC] py-14">
            <i className="fa-solid fa-camera text-[48px] text-[#787878]"></i>
            <p className="text-[22px] font-medium text-[#787878]">
              Add Picture(s)
            </p>
            <p className="font-regular text-[16px] text-[#787878]">
              Click to browse or drag and drop
            </p>
          </div>
        </div>

        <div className="flex justify-end p-3">
          <div className="flex w-[10%] cursor-pointer flex-row items-center gap-3 rounded-lg bg-[#5568FE] p-3 text-white hover:bg-[#5568FE]/80">
            <i className="fas fa-paper-plane text-[24px] font-bold"></i>
            <h2 className="text-[20px] font-bold">Post</h2>
          </div>
        </div>
      </article>
    </DashboardLayout>
  );
};

export default CreatePage;
