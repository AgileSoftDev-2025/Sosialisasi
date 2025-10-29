import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "./useHomePage";
import Image from "next/image";

const HomePage = () => {
  const { posts, isLoading, currentUserId, handleToggleLike } = useHomePage();

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Loading posts...</p>;
    }

    if (posts.length === 0) {
      return <p className="text-center text-gray-500">No posts yet.</p>;
    }

    return (
      <div className="flex flex-col gap-6">
        {posts.map((post) => {
          const hasLiked = currentUserId
            ? post.likes.includes(currentUserId)
            : false;

          return (
            <article
              key={post._id}
              className="flex w-full flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-6"
            >
              {/* Header Post */}
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={post.userId.profilePicture || "/images/logo.png"}
                  alt={post.userId.fullName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg bg-black object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-2">
                    <h3 className="text-base font-semibold text-[#202020] sm:text-lg">
                      {post.userId.fullName || "Unknown User"}
                    </h3>
                    <div className="rounded-full bg-[#5568FE]/10 px-3 py-1">
                      <h5 className="text-xs font-medium text-[#5568FE] sm:text-sm">
                        {post.type_content || "Project"}
                      </h5>
                    </div>
                  </div>
                  <h4 className="text-xs text-[#787878] sm:text-sm">
                    {new Date(post.created_at_content).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </h4>
                </div>
              </div>

              {/* Konten Post */}
              <div className="mt-4">
                <p className="text-sm whitespace-pre-wrap text-[#202020] sm:text-base">
                  {post.text_content}
                </p>
                {post.attachmentUrl_content && (
                  <div className="relative mt-3 w-full pt-[56.25%]">
                    <Image
                      src={`http://localhost:3001${post.attachmentUrl_content}`}
                      alt="Attachment"
                      layout="fill"
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Garis Pemisah & Aksi */}
              <div className="my-4 border-t border-gray-100"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5 text-gray-600">
                  <button
                    onClick={() => handleToggleLike(post._id)}
                    className="flex items-center gap-2 transition-colors duration-200 hover:text-red-500"
                  >
                    <i
                      className={`fa-heart text-xl ${hasLiked ? "fa-solid text-red-500" : "fa-regular"}`}
                    ></i>
                    <span className="text-sm font-medium">
                      {post.likes.length}
                    </span>
                  </button>
                  <div className="flex cursor-pointer items-center gap-2">
                    <i className="fa-regular fa-comment text-xl"></i>
                    <span className="text-sm font-medium">
                      {post.comments.length}
                    </span>
                  </div>
                  <i className="fa-solid fa-share cursor-pointer text-xl"></i>
                </div>
                {post.type_content !== "All" && (
                  <button className="rounded-md bg-[#5568FE] px-4 py-2 text-sm font-medium text-white hover:bg-[#5568FE]/80">
                    Apply Now
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <DashboardLayout showSearch showCreatePostCard>
      <div className="mx-auto w-full max-w-2xl">{renderContent()}</div>
    </DashboardLayout>
  );
};

export default HomePage;
