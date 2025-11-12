import React from "react";
import {
  HiUsers,
  HiCheckCircle,
  HiDocumentText,
  HiBadgeCheck,
  HiBriefcase,
} from "react-icons/hi";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import useAdminDashboard from "@/components/hooks/useAdmin";

const LoadingText = () => (
  <div className="h-6 w-1/2 animate-pulse rounded-md bg-gray-200"></div>
);

const DashboardAdmin = () => {
  const { userStatus, contentCount, isLoadingMetrics, isErrorMetrics } =
    useAdminDashboard();

  const totalUsers = userStatus?.totalUsers ?? 0;
  const activeUsers = userStatus?.activeUsers ?? 0;
  const inactiveUsers = userStatus?.inactiveUsers ?? 0;
  const mahasiswaUsers = userStatus?.mahasiswaUsers ?? 0;
  const dosenUsers = userStatus?.dosenUsers ?? 0;
  const allContent = contentCount?.allUserContents ?? 0;
  const competitionContent = contentCount?.competitionUserContents ?? 0;
  const projectCount = contentCount?.projectUserCount ?? 0;
  const totalContent = contentCount?.totalContent ?? 0;

  if (isErrorMetrics) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-red-600">
          Gagal memuat data dashboard.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex w-full flex-row gap-4 px-2 sm:gap-6 sm:px-4 lg:flex-row lg:gap-8">
        <div className="flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
          <div className="flex min-w-0 flex-col gap-2 px-2">
            <h3 className="truncate text-2xl font-bold text-gray-900 sm:text-3xl">
              Dashboard Admin
            </h3>
            <span className="truncate text-sm text-gray-600 sm:text-base">
              Selamat datang di panel admin SosialisaSI!
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-50 opacity-50 transition-transform group-hover:scale-110"></div>

              <div className="relative">
                <div className="mb-3 flex flex-row items-start justify-between">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    Total Pengguna
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <HiUsers className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mb-4">
                  {isLoadingMetrics ? (
                    <LoadingText />
                  ) : (
                    <h3 className="text-4xl font-bold text-gray-900">
                      {totalUsers}
                    </h3>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">Mahasiswa:</span>
                  <span className="font-semibold text-gray-900">
                    {mahasiswaUsers}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-gray-700">Dosen:</span>
                  <span className="font-semibold text-gray-900">
                    {dosenUsers}
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-green-50 opacity-50 transition-transform group-hover:scale-110"></div>

              <div className="relative">
                <div className="mb-3 flex flex-row items-start justify-between">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    Pengguna Aktif
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                    <HiCheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>

                <div className="mb-4">
                  {isLoadingMetrics ? (
                    <LoadingText />
                  ) : (
                    <h3 className="text-4xl font-bold text-gray-900">
                      {activeUsers}
                    </h3>
                  )}
                </div>

                <div>
                  {isLoadingMetrics ? (
                    <LoadingText />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        {Math.round((activeUsers / (totalUsers || 1)) * 100)}%
                      </span>
                      <span className="text-sm text-gray-600">
                        dari total pengguna
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-50 opacity-50 transition-transform group-hover:scale-110"></div>

              <div className="relative">
                <div className="mb-3 flex flex-row items-start justify-between">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    Total Konten
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <HiDocumentText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mb-4">
                  {isLoadingMetrics ? (
                    <LoadingText />
                  ) : (
                    <h3 className="text-4xl font-bold text-gray-900">
                      {totalContent}
                    </h3>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-blue-600">
                    Telah disetujui
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-50 opacity-50 transition-transform group-hover:scale-110"></div>

              <div className="relative">
                <div className="mb-3 flex flex-row items-start justify-between">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    Konten Competition
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <HiBadgeCheck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mb-4">
                  {isLoadingMetrics ? (
                    <LoadingText />
                  ) : (
                    <h3 className="text-4xl font-bold text-gray-900">
                      {competitionContent}
                    </h3>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-blue-600">
                    Telah disetujui
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-50 opacity-50 transition-transform group-hover:scale-110"></div>

              <div className="relative">
                <div className="mb-3 flex flex-row items-start justify-between">
                  <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    Konten Project
                  </h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <HiBriefcase className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="mb-4">
                  {isLoadingMetrics ? (
                    <LoadingText />
                  ) : (
                    <h3 className="text-4xl font-bold text-gray-900">
                      {projectCount}
                    </h3>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-blue-600">
                    Telah disetujui
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
