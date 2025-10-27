import { useState } from "react";
import Image from "next/image";

const CreatePage = () => {
  const [nyala, setNyala] = useState(0);
  return (
    <>
      <main className="h-screen w-screen overflow-x-hidden">
        {/* NavBar */}
        <nav className="relative z-40 flex w-full flex-row justify-between bg-white p-5 shadow-md">
          <div className="flex flex-row items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
            <h1 className="text-[32px] font-bold">Sosialisasi</h1>
          </div>

          <div className="flex flex-row items-center gap-7">
            <div className="rounded-xl bg-[#FAFAFF] p-4">
              <i className="fas fa-filter text-[20px] text-[#787878]"></i>
            </div>
            <div className="rounded-xl bg-[#FAFAFF] p-4">
              <i className="fas fa-bell text-[20px] text-[#787878]"></i>
            </div>
            <div className="rounded-xl bg-black p-5"></div>
          </div>
        </nav>

        <div className="flex flex-1 flex-row">
          {/* Sidebar */}
          <aside className="sticky top-0 left-0 z-30 flex h-screen w-1/5 flex-col bg-[#FAFAFF] p-4 px-5 py-8 shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]">
            <div className="flex cursor-pointer flex-row items-center gap-4 rounded-xl p-4 text-[24px] text-[#787878]">
              <i className="fa-solid fa-home"></i>
              <h3 className="font-regular">Home</h3>
            </div>
            <div className="flex cursor-pointer flex-row items-center gap-4 rounded-xl p-4 text-[24px] text-[#787878]">
              <i className="fa-solid fa-message"></i>
              <h3 className="font-regular">Messages</h3>
            </div>
            <div className="flex cursor-pointer flex-row items-center gap-4 rounded-xl p-4 text-[24px] text-[#787878]">
              <i className="fa-solid fa-user"></i>
              <h3 className="font-regular">Profile</h3>
            </div>
            <div className="flex cursor-pointer flex-row items-center gap-4 rounded-xl p-4 text-[24px] text-[#787878]">
              <i className="fa-solid fa-gear"></i>
              <h3 className="font-regular">Pengaturan</h3>
            </div>
          </aside>

          <section className="flex w-4/5 flex-1 flex-col items-center overflow-y-auto bg-[#FAFAFF]">
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
          </section>
        </div>
      </main>
    </>
  );
};

export default CreatePage;
