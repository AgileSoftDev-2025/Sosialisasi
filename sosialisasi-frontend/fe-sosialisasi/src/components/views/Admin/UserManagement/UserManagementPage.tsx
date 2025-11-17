import React from "react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { Switch } from "@heroui/switch";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import useUserManagement from "@/components/hooks/useUserManagement";

const UserManagement = () => {
  const {
    users,
    isLoadingUsers,
    filters,
    setFilters,
    toggleStatusMutation,
    isTogglingStatus,
  } = useUserManagement();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === "All" ? undefined : value,
    }));
  };

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

  if (isLoadingUsers && users.length === 0) {
    return (
      <DashboardLayout>
        <p className="pt-8 text-center text-gray-500">
          Memuat data pengguna...
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
              Kelola Pengguna
            </h3>
            <span className="truncate text-sm text-gray-600 sm:text-base">
              Kelola dan moderasi pengguna komunitas
            </span>
          </div>

          <div className="flex h-[5.5rem] flex-row items-center justify-start gap-8 rounded-lg bg-white px-[1.5rem] py-[1.594rem] shadow-sm">
            <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              <label
                htmlFor="status-filter"
                className="text-black-500 text-center text-sm font-semibold tracking-wide"
              >
                Status:
              </label>
              <div className="bg-white-500 relative flex h-[2.313rem] w-[11.063rem] flex-row items-center justify-between rounded-lg px-[0.75rem] py-[0.531rem] shadow-sm">
                <select
                  id="status-filter"
                  name="status"
                  className="w-full cursor-pointer appearance-none bg-transparent text-center text-sm font-normal tracking-wide text-black"
                  value={filters.status || "All"}
                  onChange={handleFilterChange}
                >
                  <option value="All">Semua Status</option>
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Dosen">Dosen</option>
                </select>
                <IoIosArrowDown className="pointer-events-none absolute right-3" />
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-[0.5rem]">
              <label
                htmlFor="isActive-filter"
                className="text-black-500 text-center text-sm font-semibold tracking-wide"
              >
                Aktif:
              </label>
              <div className="bg-white-500 relative flex h-[2.313rem] w-[11.063rem] flex-row items-center justify-between rounded-lg px-[0.75rem] py-[0.531rem] shadow-sm">
                <select
                  id="isActive-filter"
                  name="isActive"
                  className="w-full cursor-pointer appearance-none bg-transparent text-center text-sm font-normal tracking-wide text-black"
                  value={filters.isActive || "All"}
                  onChange={handleFilterChange}
                >
                  <option value="All">Semua</option>
                  <option value="true">Aktif</option>
                  <option value="false">Tidak Aktif</option>
                </select>
                <IoIosArrowDown className="pointer-events-none absolute right-3" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Daftar Pengguna
              </h4>
              <span className="text-sm text-gray-500">
                {users.length} pengguna ditemukan
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Pengguna
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Universitas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Tanggal Bergabung
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Aksi (Aktif/Nonaktif)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`http://localhost:3001${user.profilePicture}`}
                            alt="Profile Picture"
                            width={40}
                            height={40}
                            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.universitas}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status === "Mahasiswa"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <Switch
                          isSelected={user.isActive}
                          onValueChange={() => toggleStatusMutation(user._id)}
                          isDisabled={isTogglingStatus}
                          aria-label={`Toggle status for ${user.fullName}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
