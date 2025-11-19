"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { FaCheck, FaTimes } from "react-icons/fa";

const ModerationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Diubah ke 5 untuk menampilkan 5 item per halaman

  // Tambahkan properti date untuk sorting yang lebih akurat (misalnya, berdasarkan waktu relatif)
  // Untuk demo, saya asumsikan date adalah objek Date berdasarkan time string, tapi dalam praktiknya gunakan timestamp dari backend.
  const reports = [
    {
      id: 1,
      userName: "Javier Elsyera",
      userImage: "/images/profile_picture.png",
      time: "1 hari lalu",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 hari lalu
      content:
        "Ada yang mau beli soal ujian semester besok? Aku punya lengkap semua jawabannya.",
      reason: "Pelanggaran akademik, aktivitas ilegal",
    },
    {
      id: 2,
      userName: "Thalita Putri",
      userImage: "/images/profile_picture.png",
      time: "2 jam lalu",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 jam lalu
      content:
        "Kamu jelek banget sih, makanya gak ada yang mau temenan!",
      reason: "Perundungan, pelecehan verbal",
    },
    {
      id: 3,
      userName: "Alisha Jihan",
      userImage: "/images/profile_picture.png",
      time: "30 menit lalu",
      date: new Date(Date.now() - 30 * 60 * 1000), // 30 menit lalu
      content:
        "Susah cokkk pertanyaan dosen gak becus ngajarinnya!",
      reason: "Bahasa tidak sopan",
    },
    {
      id: 4,
      userName: "Budi Santoso",
      userImage: "/images/profile_picture.png",
      time: "1 jam lalu",
      date: new Date(Date.now() - 60 * 60 * 1000), // 1 jam lalu
      content: "Ini konten spam yang tidak berguna.",
      reason: "Spam",
    },
    {
      id: 5,
      userName: "Citra Dewi",
      userImage: "/images/profile_picture.png",
      time: "3 jam lalu",
      date: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 jam lalu
      content: "Konten ini melanggar aturan komunitas.",
      reason: "Pelanggaran aturan",
    },
    {
      id: 6,
      userName: "Dedi Rahman",
      userImage: "/images/profile_picture.png",
      time: "5 jam lalu",
      date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 jam lalu
      content: "Bahasa kasar digunakan di sini.",
      reason: "Bahasa tidak sopan",
    },
    {
      id: 7,
      userName: "Eka Sari",
      userImage: "/images/profile_picture.png",
      time: "6 jam lalu",
      date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 jam lalu
      content: "Ini adalah konten yang menyinggung.",
      reason: "Pelecehan verbal",
    },
    {
      id: 8,
      userName: "Fajar Nugroho",
      userImage: "/images/profile_picture.png",
      time: "8 jam lalu",
      date: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 jam lalu
      content: "Konten ilegal dijual di sini.",
      reason: "Aktivitas ilegal",
    },
    {
      id: 9,
      userName: "Gita Permata",
      userImage: "/images/profile_picture.png",
      time: "10 jam lalu",
      date: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 jam lalu
      content: "Spam lagi dan lagi.",
      reason: "Spam",
    },
    {
      id: 10,
      userName: "Hadi Wibowo",
      userImage: "/images/profile_picture.png",
      time: "12 jam lalu",
      date: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 jam lalu
      content: "Konten terakhir yang dilaporkan.",
      reason: "Pelanggaran aturan",
    },
  ];

  // Filter dan sort data berdasarkan search term dan sort order
  const filteredAndSortedReports = useMemo(() => {
    let filtered = reports.filter(
      (report) =>
        report.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort berdasarkan date menggunakan getTime() untuk menghindari error TypeScript
    filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        return b.date.getTime() - a.date.getTime(); // Terbaru dulu
      } else {
        return a.date.getTime() - b.date.getTime(); // Terlama dulu
      }
    });

    return filtered;
  }, [searchTerm, sortOrder]);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredAndSortedReports.length / itemsPerPage);

  // Potong data untuk halaman saat ini
  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedReports.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedReports, currentPage, itemsPerPage]);

  // Fungsi untuk berpindah halaman
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fungsi untuk previous dan next
  const goToPrevious = () => goToPage(currentPage - 1);
  const goToNext = () => goToPage(currentPage + 1);

  // Hitung range untuk teks pagination
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredAndSortedReports.length);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        {/* ===== HEADER ===== */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Moderasi Konten
          </h2>
          <p className="text-gray-600">
            Review dan tindak lanjut laporan konten dari pengguna
          </p>
        </div>

        {/* ===== SEARCH DAN FILTER ===== */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Cari berdasarkan nama, konten, atau alasan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>
        </div>

        {/* ===== TABEL LAPORAN ===== */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-700">
                <th className="p-4 text-center">Pengguna</th>
                <th className="p-4 text-center">Tanggal</th>
                <th className="p-4 text-center">Pratinjau</th>
                <th className="p-4 text-center">Lihat Postingan</th>
                <th className="p-4 text-center">Alasan</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {/* Pengguna */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={report.userImage}
                        alt={report.userName}
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-200"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {report.userName}
                        </p>
                        <p className="text-sm text-gray-500">{report.time}</p>
                      </div>
                    </div>
                  </td>

                  {/* Tanggal */}
                  <td className="p-4 text-gray-600 text-sm">
                    {report.date.toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>

                  {/* Pratinjau */}
                  <td className="p-4 text-gray-700 text-sm max-w-xs truncate">
                    {report.content}
                  </td>

                  {/* Lihat Postingan */}
                  <td className="p-4">
                    <a
                      href={`/post/${report.id}`} // Ganti dengan URL yang sesuai
                      className="text-blue-500 hover:text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat Postingan
                    </a>
                  </td>

                  {/* Alasan */}
                  <td className="p-4 text-gray-600 text-sm">{report.reason}</td>

                  {/* Aksi */}
                  <td className="p-4">
                    <div className="flex justify-center gap-3 text-lg">
                      <button
                        className="text-green-500 hover:text-green-600 transition"
                        title="Terima laporan"
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600 transition"
                        title="Tolak laporan"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ===== PAGINATION ===== */}
          <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500">
            <p>Menampilkan {startItem}–{endItem} dari {filteredAndSortedReports.length} pengguna</p>
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ModerationPage;
