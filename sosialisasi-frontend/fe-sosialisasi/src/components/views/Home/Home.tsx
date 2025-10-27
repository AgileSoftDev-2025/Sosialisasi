import Image from "next/image";

const Home = () => {
  return (
    <>
      <main className="h-screen w-screen overflow-x-hidden">
        {/* NavBar */}
        <nav className="sticky top-0 z-40 flex w-full flex-row justify-between bg-white p-5 shadow-md">
          <div className="flex flex-row items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
            <h1 className="text-[32px] font-bold">Sosialisasi</h1>
          </div>
          <div className="flex w-1/2 flex-row items-center gap-4 rounded-3xl border-2 border-[#E5E7EB] bg-[#FAFAFF] px-5 py-2">
            <i className="fas fa-search text-[20px] text-[#787878]"></i>
            <input
              className="placeholder-text-[#ADAEBC] w-full text-[20px] focus:outline-none"
              placeholder="Search Post,People,Opportunities.."
            />
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
          <aside className="sticky top-20 left-0 z-30 flex h-screen w-1/5 flex-col bg-[#FAFAFF] p-4 px-5 py-8 shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]">
            <div className="flex flex-row items-center gap-4 rounded-xl bg-[#5568FE] p-4 text-[24px] text-white">
              <i className="fas fa-home"></i>
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
            <div className="mx-5 mt-5 flex flex-col items-center justify-center gap-2 rounded-lg bg-[#E5E7EB]/30 px-7 py-4 text-center">
              <p className="text-[30px]">🚀</p>
              <p className="text-[20px] font-bold text-[#202020]">
                Share Your Journey
              </p>
              <p className="font-regular text-[16px] text-[#787878]">
                Connect with peers and discover amazing opportunities
              </p>
              <button className="w-full rounded-xl bg-[#5568FE] text-[18px] font-medium text-white hover:bg-[#5568FE]/80 focus:outline-none">
                Create Post
              </button>
            </div>
          </aside>

          <section className="flex h-full w-4/5 flex-col items-center overflow-y-auto bg-[#FAFAFF]">
            <article className="mt-7 flex w-[50%] flex-col rounded-3xl bg-white p-3 shadow-sm">
              <div className="flex flex-row items-center justify-between p-3">
                <div className="rounded-xl bg-black p-7"></div>
                <div className="flex w-[72%] flex-row items-center gap-4 rounded-2xl border-2 border-[#E5E7EB] bg-[#FAFAFF] px-5 py-3">
                  <input
                    className="placeholder-text-[#ADAEBC] w-full text-[20px] focus:outline-none"
                    placeholder="Search Post,People,Opportunities.."
                  />
                </div>
                <div className="flex cursor-pointer flex-row items-center gap-3 rounded-lg bg-[#5568FE] p-3 text-white hover:bg-[#5568FE]/80">
                  <i className="fas fa-paper-plane text-[24px] font-bold"></i>
                  <h2 className="text-[20px] font-bold">Post</h2>
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
                  🔬 Exciting opportunity! I'm looking for 3 undergraduate
                  information systems students to join my AI research project on
                  natural language processing. This is a great chance to get
                  hands-on experience with machine learning and contribute to
                  cutting-edge research.
                </p>
                <Image
                  src="/images/gambar.png"
                  alt="Logo"
                  width={200}
                  height={200}
                />
                <div className="flex flex-row items-center gap-3">
                  <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
                    <h5 className="text-[14px] font-medium text-[#5568FE]">
                      #Research Collab
                    </h5>
                  </div>
                  <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
                    <h5 className="text-[14px] font-medium text-[#5568FE]">
                      #AI
                    </h5>
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
                  🔬 Exciting opportunity! I'm looking for 3 undergraduate
                  information systems students to join my AI research project on
                  natural language processing. This is a great chance to get
                  hands-on experience with machine learning and contribute to
                  cutting-edge research.
                </p>
                <Image
                  src="/images/gambar.png"
                  alt="Logo"
                  width={200}
                  height={200}
                />
                <div className="flex flex-row items-center gap-3">
                  <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
                    <h5 className="text-[14px] font-medium text-[#5568FE]">
                      #Research Collab
                    </h5>
                  </div>
                  <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
                    <h5 className="text-[14px] font-medium text-[#5568FE]">
                      #AI
                    </h5>
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
                  🔬 Exciting opportunity! I'm looking for 3 undergraduate
                  information systems students to join my AI research project on
                  natural language processing. This is a great chance to get
                  hands-on experience with machine learning and contribute to
                  cutting-edge research.
                </p>
                <Image
                  src="/images/gambar.png"
                  alt="Logo"
                  width={200}
                  height={200}
                />
                <div className="flex flex-row items-center gap-3">
                  <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
                    <h5 className="text-[14px] font-medium text-[#5568FE]">
                      #Research Collab
                    </h5>
                  </div>
                  <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
                    <h5 className="text-[14px] font-medium text-[#5568FE]">
                      #AI
                    </h5>
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
                  🔬 Exciting opportunity! I'm looking for 3 undergraduate
                  information systems students to join my AI research project on
                  natural language processing. This is a great chance to get
                  hands-on experience with machine learning and contribute to
                  cutting-edge research.
                </p>
                <Image
                  src="/images/gambar.png"
                  alt="Logo"
                  width={200}
                  height={200}
                />
                <div className="flex flex-row items-center gap-3">
                  <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
                    <h5 className="text-[14px] font-medium text-[#5568FE]">
                      #Research Collab
                    </h5>
                  </div>
                  <div className="mt-5 rounded-full bg-[#5568FE]/10 px-5 py-1">
                    <h5 className="text-[14px] font-medium text-[#5568FE]">
                      #AI
                    </h5>
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
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
