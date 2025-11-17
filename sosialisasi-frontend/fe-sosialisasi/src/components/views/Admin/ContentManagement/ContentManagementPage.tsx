import React from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "@/components/hooks/useHomePage";

const LoadingText = () => (
  <div className="h-6 w-1/2 animate-pulse rounded-md bg-gray-200"></div>
);

const ContentManagement = () => {
  const { posts, filters, isSearching, isLoadingPosts, setFilters } =
    useHomePage();

  const formatDate = (dateString: any) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: newType === "All" ? undefined : newType,
    }));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: newStartDate || undefined,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      endDate: newEndDate || undefined,
    }));
  };

  if (isLoadingPosts) {
    return (
      <DashboardLayout>
        <p className="pt-8 text-center text-gray-500">
          {isSearching ? "Mencari..." : "Menunggu posts..."}
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex w-full flex-row gap-4 px-[2rem] sm:gap-6 sm:px-4 lg:flex-row lg:gap-8">
        <div className="flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
          <div className="flex min-w-0 flex-col gap-2 px-2">
            <h3 className="truncate text-2xl font-bold text-gray-900 sm:text-3xl">
              Kelola Konten
            </h3>
            <span className="truncate text-sm text-gray-600 sm:text-base">
              Kelola dan moderasi konten dari komunitas pembelajaran
            </span>
          </div>

          <div className="flex h-[5.5rem] flex-row items-center justify-between rounded-lg bg-white px-[1.5rem] py-[1.594rem] shadow-sm">
            {/* <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              <p className="text-black-500 text-center text-sm font-semibold tracking-wide">
                Status:
              </p>
              <div className="bg-white-500 flex h-[2.313rem] w-[11.063rem] flex-row items-center justify-between rounded-lg px-[0.75rem] py-[0.531rem] shadow-sm">
                <span className="text-black-500 text-center text-sm font-normal tracking-wide">
                  Semua Status
                </span>
                <IoIosArrowDown />
              </div>
            </div> */}

            <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              <label
                htmlFor="kategori-filter"
                className="text-black-500 text-center text-sm font-semibold tracking-wide"
              >
                Kategori:
              </label>
              <div className="bg-white-500 relative flex h-[2.313rem] w-[11.063rem] flex-row items-center justify-between rounded-lg px-[0.75rem] py-[0.531rem] shadow-sm">
                <select
                  id="kategori-filter"
                  className="w-full cursor-pointer appearance-none bg-transparent text-center text-sm font-normal tracking-wide text-black"
                  value={filters.type || "All"}
                  onChange={handleTypeChange}
                >
                  <option value="All">Semua Kategori</option>
                  <option value="Competition">Competition</option>
                  <option value="Project">Project</option>
                </select>
                <IoIosArrowDown className="pointer-events-none absolute right-3" />
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              <label
                htmlFor="startDate-filter"
                className="text-black-500 text-center text-sm font-semibold tracking-wide"
              >
                Mulai:
              </label>
              <input
                id="startDate-filter"
                type="date"
                className="bg-white-500 flex h-[2.313rem] w-[11.063rem] rounded-lg px-[0.75rem] py-[0.531rem] text-center text-sm font-normal tracking-wide text-black shadow-sm"
                value={filters.startDate || ""} // Kontrol nilai
                onChange={handleStartDateChange} // Hubungkan handler
              />
            </div>

            <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              <label
                htmlFor="endDate-filter"
                className="text-black-500 text-center text-sm font-semibold tracking-wide"
              >
                Hingga:
              </label>
              <input
                id="endDate-filter"
                type="date"
                className="bg-white-500 flex h-[2.313rem] w-[11.063rem] rounded-lg px-[0.75rem] py-[0.531rem] text-center text-sm font-normal tracking-wide text-black shadow-sm"
                value={filters.endDate || ""}
                onChange={handleEndDateChange}
              />
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Daftar Konten
              </h4>
              <span className="text-sm text-gray-500">
                {posts.length} konten ditemukan
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Konten
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Penulis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Postingan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-medium text-gray-900">
                              {post?.text_content}
                            </div>
                            <div className="text-sm text-gray-500">
                              {post?.type_content}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
                            <Image
                              src={`http://localhost:3001${post.userId.profilePicture}`}
                              alt="Profile Picture"
                              width={10}
                              height={10}
                              className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-900">
                            {post?.userId?.fullName || "Unknown User"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {post?.attachmentUrl_content ? (
                          <a
                            href={`http://localhost:3001${post.attachmentUrl_content}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-full px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Lihat Postingan
                          </a>
                        ) : (
                          <span className="inline-flex rounded-full px-3 py-1 text-xs font-medium text-gray-500">
                            -
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(post?.created_at_content)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                            <IoIosArrowDown />
                          </button>
                          {/* {content.status === "Disetujui" ? (
                            <>
                              <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                <IoIosArrowDown />
                              </button>
                              <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600">
                                <IoIosArrowDown />
                              </button>
                            </>
                          ) : content.status === "Ditolak" ? (
                            <>
                              <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                <IoIosArrowDown />
                              </button>
                              <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600">
                                <IoIosArrowDown />
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-green-600">
                                <IoIosArrowDown />
                              </button>
                              <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600">
                                <IoIosArrowDown />
                              </button>
                            </>
                          )} */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t px-6 py-4">
              <span className="text-sm text-gray-500">
                Menampilkan 1 - 3 dari {posts.length} konten
              </span>
              <div className="flex items-center gap-2">
                <button className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100">
                  ←
                </button>
                <button className="rounded bg-blue-600 px-3 py-1 text-white">
                  1
                </button>
                <button className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100">
                  2
                </button>
                <button className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100">
                  3
                </button>
                <button className="rounded px-3 py-1 text-gray-500 hover:bg-gray-100">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContentManagement;
