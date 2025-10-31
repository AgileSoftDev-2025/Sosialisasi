import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "./useHomePage";
import Image from "next/image";
import { useState } from "react";

const HomePage = () => {
  const {
    posts,
    isLoading,
    currentUserId,
    handleToggleLike,
    handleToggleComments,
    handleSendComment,
    handleInputChange,
    visibleComments,
    commentsByPost,
    commentInputs,
    loadingComments,
    handleShare,
  } = useHomePage();

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Loading posts...</p>;
    }

    if (posts.length === 0) {
      return <p className="text-center text-gray-500">No posts yet.</p>;
    }

    return (
      <div className="flex w-full flex-col gap-6">
        {posts.map((post) => {
          const hasLiked = currentUserId
            ? post.likes.includes(currentUserId)
            : false;
          const showComments = visibleComments[post._id] || false;
          const comments = commentsByPost[post._id] || [];

          return (
            <div key={post._id} className="flex w-full flex-col gap-4">
              <article className="flex w-full flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                {/* Header Post */}
                <div className="flex flex-row items-center gap-4">
                  <Image
                    src={post.userId.profilePicture || "/images/logo.png"}
                    alt={post.userId.fullName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full bg-black object-cover"
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
                      {new Date(post.created_at_content).toLocaleString(
                        "id-ID",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        },
                      )}
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

                {/* Aksi */}
                <div className="my-4 border-t border-gray-100"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5 text-gray-600">
                    {/* Like */}
                    <button
                      onClick={() => handleToggleLike(post._id)}
                      className="flex items-center gap-2 transition-colors duration-200 hover:text-red-500"
                    >
                      <i
                        className={`fa-heart cursor-pointer text-xl ${
                          hasLiked ? "fa-solid text-red-500" : "fa-regular"
                        }`}
                      ></i>
                      <span className="text-sm font-medium">
                        {post.likes.length}
                      </span>
                    </button>

                    {/* Comment */}
                    <button
                      onClick={() => handleToggleComments(post._id)}
                      className="flex items-center gap-2 transition-colors duration-200 hover:text-[#5568FE]"
                    >
                      <i className="fa-regular fa-comment text-xl"></i>
                      <span className="text-sm font-medium">
                        {post.comments.length}
                      </span>
                    </button>

                    <i
                      className="fa-solid fa-share cursor-pointer text-xl"
                      onClick={() => handleShare(post._id)}
                    ></i>
                  </div>

                  {post.type_content !== "All" && (
                    <button className="rounded-md bg-[#5568FE] px-4 py-2 text-sm font-medium text-white hover:bg-[#5568FE]/80">
                      Apply Now
                    </button>
                  )}
                </div>
              </article>

              {/* Komentar */}
              {showComments && (
                <article className="flex w-full flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                  <div className="mb-5 flex flex-row items-center gap-4">
                    <Image
                      src={post.userId.profilePicture || "/images/logo.png"}
                      alt={post.userId.fullName}
                      width={48}
                      height={48}
                      className="-mt-2 h-12 w-12 rounded-full bg-black object-cover"
                    />
                    <div className="h-auto w-full rounded-lg border-2 border-[#E5E7EB] bg-[#FAFAFF] px-4">
                      <textarea
                        placeholder="Write a Comment"
                        className="mt-1 mb-1 w-full resize-none overflow-hidden focus:outline-none"
                        rows={1}
                        value={commentInputs[post._id] || ""}
                        onChange={(e) =>
                          handleInputChange(post._id, e.target.value)
                        }
                        onInput={(e) => {
                          e.currentTarget.style.height = "auto";
                          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleSendComment(post._id)}
                      className="flex h-10 w-auto min-w-[90px] flex-row items-center justify-center gap-2 rounded-lg bg-[#5568FE] text-white hover:bg-[#5568FE]/80 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      <i className="fas fa-paper-plane text-sm"></i>
                      <h2 className="text-sm font-bold">Send</h2>
                    </button>
                  </div>

                  <h1 className="mb-4 text-[20px] font-semibold text-[#111827]">
                    Komentar
                  </h1>

                  {loadingComments[post._id] ? (
                    <p className="text-sm text-gray-500">Loading comments...</p>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="mt-3 flex flex-row gap-4"
                      >
                        <Image
                          src={
                            comment.id_user?.profilePicture ||
                            "/images/logo.png"
                          }
                          alt={comment.id_user?.fullName || "User"}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full bg-black object-cover"
                        />
                        <div className="-mt-1 flex flex-col">
                          <div className="flex flex-wrap items-center gap-x-2">
                            <h3 className="text-base font-semibold text-[#202020] sm:text-lg">
                              {comment.id_user?.fullName || "Unknown User"}
                            </h3>
                            <h4 className="text-xs text-[#787878] sm:text-sm">
                              {new Date(
                                comment.created_at_comment,
                              ).toLocaleString("id-ID", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </h4>
                          </div>
                          <p className="text-sm whitespace-pre-wrap text-[#202020]">
                            {comment.text_comment}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Belum ada komentar.</p>
                  )}
                </article>
              )}
            </div>
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
