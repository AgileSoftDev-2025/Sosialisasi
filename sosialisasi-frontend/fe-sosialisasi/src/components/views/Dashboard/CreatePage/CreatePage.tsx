import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const CreatePage = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");

  const getCategory = () => {
    switch (categoryIndex) {
      case 1:
        return "Competition";
      case 2:
        return "Project";
      default:
        return "All";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return alert("Deskripsi wajib diisi");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    const formData = new FormData();
    formData.append("text_content", text);
    formData.append("type_content", getCategory());
    if (file) formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3001/api/upload/content", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // 🧠 Cek dulu apakah server beneran kasih JSON
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const textResponse = await res.text();
        console.error("Response bukan JSON:", textResponse);
        throw new Error("Server mengembalikan response bukan JSON");
      }

      const data = await res.json();

      if (!res.ok) {
        console.error("Response error:", data);
        throw new Error(data.message || "Upload gagal");
      }

      alert(data.message || "Upload berhasil!");
      console.log("Response sukses:", data);

      // Reset form
      setText("");
      setFile(null);
      setPreview(null);
      setCategoryIndex(0);
    } catch (err: any) {
      console.error("Error saat upload:", err);
      alert(err.message || "Terjadi kesalahan saat upload");
    }
  };

  return (
    <DashboardLayout>
      <article className="mt-10 flex w-[80%] flex-col rounded-3xl bg-white p-8 shadow-sm">
        {/* Header User */}
        <div className="flex flex-row items-center gap-5 p-3">
          <div className="rounded-xl bg-black p-7"></div>
          <div className="flex flex-col">
            <h3 className="text-[20px] font-medium text-[#202020]">
              Mochamad Javier Elsyera
            </h3>
            <h4 className="text-[16px] text-[#787878]">
              Information System Student
            </h4>
          </div>
        </div>

        {/* Kategori */}
        <div className="mt-6 flex flex-col gap-4 p-3">
          <h2 className="text-[20px] font-medium text-[#202020]">
            Choose Category
          </h2>
          <div className="flex flex-row items-center gap-4">
            {["All", "Competition", "Project"].map((cat, idx) => (
              <div
                key={cat}
                onClick={() => setCategoryIndex(idx)}
                className={`flex cursor-pointer flex-row items-center gap-2 rounded-full px-6 py-3 ${
                  categoryIndex === idx
                    ? "bg-[#5568FE] text-white"
                    : "bg-[#E5E7EB] text-[#787878]"
                }`}
              >
                <p className="text-[16px] font-medium">{cat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mt-6 flex flex-col gap-4 p-3">
          <h2 className="text-[20px] font-medium text-[#202020]">
            Post Description
          </h2>
          <div className="rounded-2xl border border-[#ADAEBC] p-7">
            <textarea
              placeholder="Write something to share…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-48 w-full resize-none text-[20px] focus:outline-none"
            />
          </div>
        </div>

        {/* Upload gambar */}
        <div className="mt-6 flex flex-col gap-4 p-3">
          <h2 className="text-[20px] font-medium text-[#202020]">
            Add Pictures
          </h2>

          <label
            htmlFor="fileUpload"
            className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-[#ADAEBC] py-14 hover:bg-gray-50"
          >
            <i className="fa-solid fa-camera text-[48px] text-[#787878]"></i>
            <p className="text-[22px] font-medium text-[#787878]">
              Add Picture(s)
            </p>
            <p className="text-[16px] text-[#787878]">
              Click to browse or drag and drop
            </p>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-60 rounded-lg border"
            />
          )}
        </div>

        {/* Tombol Post */}
        <div className="flex justify-end p-3">
          <button
            onClick={handleSubmit}
            className="flex w-[10%] flex-row items-center gap-3 rounded-lg bg-[#5568FE] p-3 text-white hover:bg-[#5568FE]/80"
          >
            <i className="fas fa-paper-plane text-[24px]"></i>
            <h2 className="text-[20px] font-bold">Post</h2>
          </button>
        </div>
      </article>
    </DashboardLayout>
  );
};

export default CreatePage;
