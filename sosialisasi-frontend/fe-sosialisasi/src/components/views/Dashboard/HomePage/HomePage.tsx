import Image from "next/image";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState, useEffect } from "react";
import axios from "axios";

interface Content {
  _id: string;
  text_content: string;
  attachmentUrl_content?: string;
  type_content: string;
  created_at_content: string;
  userId?: {
    fullName: string;
  };
  tags?: string[];
  likes?: number;
  comments?: { _id: string }[];
}

const HomePage = () => {
  const [data, setData] = useState<Content[]>([]);

  const token = { user: { accessToken: "YOUR_ACCESS_TOKEN_HERE" } };

  const getDataContent = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/upload/content");
      setData(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    getDataContent();
  }, []);

  useEffect(() => {
    const updateLikes = async () => {
      const updatedData = await Promise.all(
        data.map(async (item) => {
          const likesCount = await fetchLikes(item._id);
          return { ...item, likes: likesCount };
        }),
      );
      setData(updatedData);
    };

    if (data.length) updateLikes();
  }, [data]);

  const handleToggleLike = async (contentId: string, userId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/like/toggle/${contentId}?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.user.accessToken}`,
          },
          body: JSON.stringify({}), // wajib meskipun kosong
        },
      );

      const data = await res.json();
      const action = data.action;

      setData((prev) =>
        prev.map((item) =>
          item._id === contentId
            ? {
                ...item,
                likes:
                  action === "like"
                    ? (item.likes || 0) + 1
                    : Math.max((item.likes || 1) - 1, 0),
              }
            : item,
        ),
      );
    } catch (err) {
      console.error("Gagal toggle like:", err);
    }
  };

  const fetchLikes = async (contentId: string) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/like/toggle/${contentId}`,
      );
      const data = await res.json();
      return data.totalLikes || 0;
    } catch (err) {
      console.error("Gagal ambil like:", err);
      return 0;
    }
  };

  return (
    <DashboardLayout showSearch showCreatePostCard>
      {data.map((item) => (
        <article
          key={item._id}
          className="mt-7 flex w-[50%] flex-col rounded-3xl bg-white p-3 shadow-sm"
        >
          {/* Header */}
          <div className="flex flex-row gap-5 p-3">
            <div className="rounded-xl bg-black p-7"></div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4">
                <h3 className="text-[18px] font-semibold text-[#202020]">
                  {item.userId?.fullName || "Unknown User"}
                </h3>
                <div className="rounded-full bg-[#5568FE]/10 px-5 py-1">
                  <h5 className="text-[14px] font-medium text-[#5568FE]">
                    {item.type_content || "Project"}
                  </h5>
                </div>
              </div>
              <h4 className="font-regular text-[14px] text-[#787878]">
                {item.created_at_content
                  ? new Date(item.created_at_content).toLocaleString()
                  : "Unknown time"}
              </h4>
            </div>
          </div>

          {/* Content */}
          <div className="font-regular p-3 text-[16px] text-[#202020]">
            <p>{item.text_content}</p>

            {item.attachmentUrl_content && (
              <Image
                src={
                  item.attachmentUrl_content
                    ? `http://localhost:3001${item.attachmentUrl_content}`
                    : "/images/default.png"
                }
                alt="Content Image"
                width={800}
                height={200}
                className="mt-3 rounded-lg"
              />
            )}

            {/* Tags */}
            <div className="mt-5 flex flex-row items-center gap-3">
              {item.tags?.map((tag, idx) => (
                <div
                  key={idx}
                  className="rounded-full bg-[#5568FE]/10 px-5 py-1"
                >
                  <h5 className="text-[14px] font-medium text-[#5568FE]">
                    {tag}
                  </h5>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-[#F3F4F6]"></div>

            {/* Actions */}
            <div className="flex flex-row items-center justify-between pt-4">
              <div className="flex flex-row items-center gap-5">
                <div className="flex flex-row items-center gap-1">
                  <i
                    className={`fa-heart cursor-pointer ${item.likes && item.likes > 0 ? "fa-solid text-red-500" : "fa-regular"}`}
                    onClick={() => handleToggleLike(item._id)}
                  ></i>
                  <p>{item.likes || 0}</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <i className="fa-regular fa-comment cursor-pointer"></i>
                  <p>{item.comments?.length || 0}</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <i className="fa-solid fa-share cursor-pointer"></i>
                </div>
              </div>
              <button className="rounded-md bg-[#5568FE] p-3 text-[14px] font-medium text-white hover:bg-[#5568FE]/80">
                Apply Now
              </button>
            </div>
          </div>
        </article>
      ))}
    </DashboardLayout>
  );
};

export default HomePage;
