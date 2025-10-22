import React from "react";
import Image from "next/image";

const HomePage = () => {
  const posting = "/images/posting.png";
  const logo = "/images/logo.png";
  return (
    <main className="flex h-screen w-screen flex-row">
      <aside className="h-screen w-1/5 bg-white">
        <section className="w-full py-8">
          <div className="flex w-full flex-row items-center gap-2 px-10">
            <img src={logo} alt="Logo" />
            <h1 className="text-[28px] font-medium text-[#D6B177]">
              Sosialisa<span className="font-bold text-[#122C49]">SI</span>
            </h1>
          </div>

          <div className="mt-10 flex w-full flex-col gap-5">
            <div className="flex flex-row items-center gap-5 px-14 py-2 text-[24px] font-medium text-black">
              <i className="fas fa-search text-gray-700"></i>
              <h2>Search</h2>
            </div>

            <div className="flex w-full flex-row items-center gap-5 bg-[#CFAE78] px-14 py-2 text-[24px] font-medium text-white">
              <i className="fas fa-home"></i>
              <h2>Home</h2>
            </div>

            <div className="flex flex-row items-center gap-5 px-14 py-2 text-[24px] font-medium text-black">
              <i className="fas fa-envelope text-gray-700"></i>
              <h2>Messages</h2>
            </div>

            <div className="flex flex-row items-center gap-5 px-14 py-2 text-[24px] font-medium text-black">
              <i className="fas fa-user text-gray-700"></i>
              <h2>Profile</h2>
            </div>

            <div className="flex flex-row items-center gap-5 px-14 py-2 text-[24px] font-medium text-black">
              <i className="fas fa-book text-gray-700"></i>
              <h2>Create Post</h2>
            </div>

            <div className="flex flex-row items-center gap-5 px-14 py-2 text-[24px] font-medium text-black">
              <i className="fas fa-graduation-cap text-gray-700"></i>
              <h2>Mini Class</h2>
            </div>

            <div className="flex flex-row items-center gap-5 px-14 py-2 text-[24px] font-medium text-black">
              <i className="fas fa-bell text-gray-700"></i>
              <h2>Notification</h2>
            </div>

            <div className="flex flex-row items-center gap-5 px-14 py-2 text-[24px] font-medium text-black">
              <i className="fas fa-cog text-gray-700"></i>
              <h2>Manage Profile</h2>
            </div>
          </div>
        </section>
      </aside>

      <article className="h-screen w-4/5 flex-1 overflow-y-auto bg-[#122C49] px-24 py-8">
        <section className="w-4/5">
          <div className="flex flex-row items-center justify-end gap-2 px-8 text-[24px] font-medium text-white">
            <h2>Category</h2>
            <i className="fas fa-filter -mb-2 text-[28px]"></i>
          </div>

          {/* Konten */}
          <div className="mt-3 mb-10 bg-white px-10 py-8">
            <div className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-black p-6"></div>
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold">
                  Mochamad Javier Elsyera
                </h3>
                <h5 className="text-[18px] text-gray-400">
                  31 Agustus 2025 19:35
                </h5>
              </div>
            </div>
            <div className="font-regular mt-8 mb-14 text-[20px]">
              <p>Hallo Sobat tambang,</p>
              <br />
              <p>Kami ingin mengajak kamu untuk berkolaborasi nih Proyek nih</p>
              <br />
              <p>📌 Posisi yang dibuka:</p>
              <p>- Engineering</p>
              <p>- Plant</p>
              <p>- CRM</p>
              <p>- SCM</p>
            </div>
            <div className="mb-28">
              <img src={posting} className="w-full" />
            </div>
            <div className="flex flex-row gap-10 text-[20px] font-medium">
              <div className="flex flex-row items-center gap-2">
                <i className="fa-regular fa-thumbs-up"></i>
                <h6 className="text-gray-400">Like</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <i className="fa-regular fa-comments"></i>
                <h6 className="text-gray-400">Comment</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <i className="fas fa-share"></i>
                <h6 className="text-gray-400">Share</h6>
              </div>
            </div>
          </div>

          {/* Konten 2 */}
          <div className="mt-3 mb-20 bg-white px-10 py-8">
            <div className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-black p-6"></div>
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold">
                  Mochamad Javier Elsyera
                </h3>
                <h5 className="text-[18px] text-gray-400">
                  31 Agustus 2025 19:35
                </h5>
              </div>
            </div>
            <div className="font-regular mt-8 mb-14 text-[20px]">
              <p>Hallo Sobat tambang,</p>
              <br />
              <p>Kami ingin mengajak kamu untuk berkolaborasi nih Proyek nih</p>
              <br />
              <p>📌 Posisi yang dibuka:</p>
              <p>- Engineering</p>
              <p>- Plant</p>
              <p>- CRM</p>
              <p>- SCM</p>
            </div>
            <div className="mb-28">
              <img src={posting} className="w-full" />
            </div>
            <div className="flex flex-row gap-10 text-[20px] font-medium">
              <div className="flex flex-row items-center gap-2">
                <i className="fa-regular fa-thumbs-up"></i>
                <h6 className="text-gray-400">Like</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <i className="fa-regular fa-comments"></i>
                <h6 className="text-gray-400">Comment</h6>
              </div>
              <div className="flex flex-row items-center gap-2">
                <i className="fas fa-share"></i>
                <h6 className="text-gray-400">Share</h6>
              </div>
            </div>
          </div>
        </section>
        <button className="fixed right-40 bottom-8 rounded-lg bg-[#CFAE78] px-6 py-3 text-[18px] font-bold text-white shadow-lg transition hover:bg-[#b28f5c]">
          Create Post
        </button>
      </article>
    </main>
  );
};

export default HomePage;
