import Image from "next/image";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const HomePage = () => {
  return (
    <DashboardLayout showSearch showCreatePostCard>
      <article className="mt-7 flex w-[50%] flex-col rounded-3xl bg-white p-3 shadow-sm">
        <div className="flex flex-row gap-5 p-3">
          <div className="rounded-xl bg-black p-7"></div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-4">
              <h3 className="text-[18px] font-semibold text-[#202020]">
                Mochamad Javier Elsyera
              </h3>
              <div className="rounded-full bg-[#5568FE]/10 px-5 py-1">
                <h5 className="text-[14px] font-medium text-[#5568FE]">
                  Project
                </h5>
              </div>
            </div>
            <h4 className="font-regular text-[14px] text-[#787878]">
              2 Hours Ago
            </h4>
          </div>
        </div>

        <div className="font-regular p-3 text-[16px] text-[#202020]">
          <p>
            🔬 Exciting opportunity! I'm looking for 3 undergraduate information
            systems students to join my AI research project on natural language
            processing. This is a great chance to get hands-on experience with
            machine learning and contribute to cutting-edge research.
          </p>
          <Image src="/images/gambar.png" alt="Logo" width={200} height={200} />
          <div className="flex flex-row items-center gap-3">
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">
                #Research Collab
              </h5>
            </div>
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">#AI</h5>
            </div>
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">
                #Undergraduate
              </h5>
            </div>
          </div>
          <div className="mt-5 border border-[#F3F4F6]"></div>
          <div className="flex flex-row items-center justify-between pt-4">
            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-heart"></i>
                <p>24</p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-comment"></i>
                <p>8</p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-bookmark"></i>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-solid fa-share"></i>
              </div>
            </div>
            <button className="bg-[#5568FE] text-[14px] font-medium text-white hover:bg-[#5568FE]/80">
              Apply Now
            </button>
          </div>
        </div>
      </article>
      <article className="mt-7 flex w-[50%] flex-col rounded-3xl bg-white p-3 shadow-sm">
        <div className="flex flex-row gap-5 p-3">
          <div className="rounded-xl bg-black p-7"></div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-4">
              <h3 className="text-[18px] font-semibold text-[#202020]">
                Mochamad Javier Elsyera
              </h3>
              <div className="rounded-full bg-[#5568FE]/10 px-5 py-1">
                <h5 className="text-[14px] font-medium text-[#5568FE]">
                  Project
                </h5>
              </div>
            </div>
            <h4 className="font-regular text-[14px] text-[#787878]">
              2 Hours Ago
            </h4>
          </div>
        </div>

        <div className="font-regular p-3 text-[16px] text-[#202020]">
          <p>
            🔬 Exciting opportunity! I'm looking for 3 undergraduate information
            systems students to join my AI research project on natural language
            processing. This is a great chance to get hands-on experience with
            machine learning and contribute to cutting-edge research.
          </p>
          <Image src="/images/gambar.png" alt="Logo" width={200} height={200} />
          <div className="flex flex-row items-center gap-3">
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">
                #Research Collab
              </h5>
            </div>
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">#AI</h5>
            </div>
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">
                #Undergraduate
              </h5>
            </div>
          </div>
          <div className="mt-5 border border-[#F3F4F6]"></div>
          <div className="flex flex-row items-center justify-between pt-4">
            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-heart"></i>
                <p>24</p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-comment"></i>
                <p>8</p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-bookmark"></i>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-solid fa-share"></i>
              </div>
            </div>
            <button className="bg-[#5568FE] text-[14px] font-medium text-white hover:bg-[#5568FE]/80">
              Apply Now
            </button>
          </div>
        </div>
      </article>
      <article className="mt-7 flex w-[50%] flex-col rounded-3xl bg-white p-3 shadow-sm">
        <div className="flex flex-row gap-5 p-3">
          <div className="rounded-xl bg-black p-7"></div>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-4">
              <h3 className="text-[18px] font-semibold text-[#202020]">
                Mochamad Javier Elsyera
              </h3>
              <div className="rounded-full bg-[#5568FE]/10 px-5 py-1">
                <h5 className="text-[14px] font-medium text-[#5568FE]">
                  Project
                </h5>
              </div>
            </div>
            <h4 className="font-regular text-[14px] text-[#787878]">
              2 Hours Ago
            </h4>
          </div>
        </div>

        <div className="font-regular p-3 text-[16px] text-[#202020]">
          <p>
            🔬 Exciting opportunity! I'm looking for 3 undergraduate information
            systems students to join my AI research project on natural language
            processing. This is a great chance to get hands-on experience with
            machine learning and contribute to cutting-edge research.
          </p>
          <Image src="/images/gambar.png" alt="Logo" width={200} height={200} />
          <div className="flex flex-row items-center gap-3">
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">
                #Research Collab
              </h5>
            </div>
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">#AI</h5>
            </div>
            <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
              <h5 className="text-[14px] font-medium text-[#5568FE]">
                #Undergraduate
              </h5>
            </div>
          </div>
          <div className="mt-5 border border-[#F3F4F6]"></div>
          <div className="flex flex-row items-center justify-between pt-4">
            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-heart"></i>
                <p>24</p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-comment"></i>
                <p>8</p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-regular fa-bookmark"></i>
              </div>
              <div className="flex flex-row items-center gap-1">
                <i className="fa-solid fa-share"></i>
              </div>
            </div>
            <button className="bg-[#5568FE] text-[14px] font-medium text-white hover:bg-[#5568FE]/80">
              Apply Now
            </button>
          </div>
        </div>
      </article>
    </DashboardLayout>
  );
};

export default HomePage;
