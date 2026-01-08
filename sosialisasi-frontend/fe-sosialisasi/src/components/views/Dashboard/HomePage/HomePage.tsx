import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "../../../hooks/useHomePage";
import Image from "next/image";
import CommentSection from "./CommentSectionPage";
import { useRouter } from "next/router";
import environment from "@/config/environment";
import { useState } from "react";

const BUTTON_TOPICS = [
  "Sistem Informasi",
  "Universitas Airlangga",
  "Magang",
  "Lomba",
  "Pilemon",
];

const HomePage = () => {
  const router = useRouter();
  const [connectingUserId, setConnectingUserId] = useState<string | null>(null);
  const [showMoreModal, setShowMoreModal] = useState(false);

  const {
    posts,
    users,
    isSearching,
    searchTerm,
    isLoadingPosts,
    currentUserId,
    visibleComments,
    commentInputs,
    isSendingComment,
    session,
    suggestions,
    trendingPosts,
    setSearchTerm,
    handleConnect,
    handleToggleLike,
    handleToggleComments,
    handleInputChange,
    handleSendComment,
    handleShare,
    isConnecting,
  } = useHomePage();

  const handleTopicClick = (topic: string) => {
    if (searchTerm === topic) {
      setSearchTerm("");
    } else {
      setSearchTerm(topic);
    }
  };

  const onConnectClick = (userId: string) => {
    setConnectingUserId(userId);
    handleConnect(userId);
  };

  if (isLoadingPosts) {
    return (
      <DashboardLayout showSearch>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-2 sm:gap-6 sm:px-4 lg:flex-row lg:gap-8">
          <div className="flex w-full flex-col gap-4 sm:gap-6 lg:max-w-5xl">
            <div className="scrollbar-hide flex w-full flex-row items-center gap-2 overflow-x-auto pb-2"></div>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex w-full animate-pulse flex-col rounded-lg bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 lg:p-6"
              >
                <div className="flex flex-row items-center gap-3 sm:gap-4">
                  <div className="flex cursor-pointer flex-row items-center gap-3 sm:gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 sm:h-12 sm:w-12 lg:h-14 lg:w-14"></div>
                    <div className="flex min-w-0 flex-col gap-2">
                      <div className="h-5 w-32 rounded bg-gray-200 sm:h-6 sm:w-40"></div>
                      <div className="h-3 w-24 rounded bg-gray-200 sm:h-4 sm:w-32"></div>
                    </div>
                  </div>
                  <div className="h-6 w-20 rounded-full bg-gray-200 sm:h-7 sm:w-24"></div>
                </div>

                <div className="mt-3 sm:mt-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200"></div>
                    <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                    <div className="h-4 w-4/6 rounded bg-gray-200"></div>
                  </div>

                  <div className="relative mt-3 aspect-video w-full rounded-lg bg-gray-200"></div>
                </div>

                <div className="my-3 border-t border-gray-100 sm:my-4"></div>

                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="h-6 w-12 rounded bg-gray-200"></div>
                    <div className="h-6 w-12 rounded bg-gray-200"></div>
                    <div className="h-6 w-8 rounded bg-gray-200"></div>
                  </div>
                  <div className="h-8 w-full rounded-lg bg-gray-200 sm:w-24"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky top-4 hidden max-w-sm flex-col gap-4 self-start lg:flex lg:max-w-sm lg:gap-5 xl:max-w-md">
            <div className="flex max-w-sm animate-pulse flex-col gap-4 rounded-2xl bg-white p-4 shadow-md lg:gap-5 lg:p-6">
              <div className="h-7 w-48 rounded bg-gray-200 lg:h-8"></div>
              <div className="flex flex-col gap-4 lg:gap-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex flex-row items-center gap-3 lg:gap-4"
                  >
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 lg:h-12 lg:w-12"></div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="h-4 w-32 rounded bg-gray-200"></div>
                      <div className="h-3 w-24 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-8 w-20 flex-shrink-0 rounded-lg bg-gray-200"></div>
                  </div>
                ))}
                <div className="mt-2 h-5 w-full rounded bg-gray-200"></div>
              </div>
            </div>

            <div className="flex w-full animate-pulse flex-col gap-4 rounded-2xl bg-white p-4 shadow-md lg:gap-5 lg:p-6">
              <div className="h-7 w-56 rounded bg-gray-200 lg:h-8"></div>
              <div className="flex flex-col gap-4 lg:gap-6">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="-m-2 flex flex-row items-center gap-3 rounded-lg p-2 lg:gap-4"
                  >
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-200 lg:h-12 lg:w-12"></div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="h-4 w-40 rounded bg-gray-200"></div>
                      <div className="h-3 w-20 rounded bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout showSearch>
      <div className="mx-auto mt-5 flex w-full max-w-7xl flex-col gap-4 px-2 sm:gap-6 sm:px-4 lg:flex-row lg:gap-8">
        <div className="flex w-full flex-col gap-4 sm:gap-6 lg:max-w-5xl">
          <div className="mx-auto flex flex-wrap justify-start gap-2 sm:gap-3">
            {BUTTON_TOPICS.map((topic, index) => {
              const isActive = searchTerm === topic;
              return (
                <button
                  key={index}
                  onClick={() => handleTopicClick(topic)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "border-[#5568FE] bg-[#5568FE] text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
          {posts.length === 0 &&
            (!isSearching || (users && users.length === 0)) && (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-12 text-center shadow-sm">
                <i className="fas fa-search mb-4 text-4xl text-gray-300"></i>
                <p className="text-gray-500">
                  {isSearching
                    ? `Tidak ada hasil untuk "${searchTerm}"`
                    : "Belum Ada Postingan."}
                </p>
              </div>
            )}

          {isSearching && users && users.length > 0 && (
            <div className="flex w-full flex-col rounded-lg bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 lg:p-6">
              <h2 className="mb-4 text-xl font-bold text-gray-900">People</h2>
              <div className="flex flex-col gap-4">
                {users.map((user: any) => (
                  <div
                    key={user._id}
                    className="flex cursor-pointer flex-row items-center gap-3 sm:gap-4"
                    onClick={() =>
                      router.push(`/dashboard/profileuser/${user._id}`)
                    }
                  >
                    <Image
                      src={`${environment.CONSTANT_URL}${user.profilePicture}`}
                      alt={user.fullName}
                      width={48}
                      height={48}
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
                    />
                    <div className="flex min-w-0 flex-col">
                      <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                        {user.fullName}
                      </h3>
                      <span className="truncate text-xs text-gray-500 sm:text-sm">
                        {user.status} di {user.universitas}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isSearching && posts.length > 0 && (
            <h2 className="mt-2 text-xl font-bold text-gray-900">Posts</h2>
          )}

          {posts.map((post) => {
            const hasLiked = currentUserId
              ? post.likes.includes(currentUserId)
              : false;
            const showComments = visibleComments[post._id] || false;

            return (
              <div
                key={post._id}
                className="flex w-full flex-col rounded-lg bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 lg:p-6"
              >
                <div className="flex flex-row items-center gap-3 sm:gap-4">
                  <div
                    className="flex cursor-pointer flex-row items-center gap-3 sm:gap-4"
                    onClick={() =>
                      router.push(`/dashboard/profileuser/${post.userId._id}`)
                    }
                  >
                    <Image
                      src={`${environment.CONSTANT_URL}${post.userId.profilePicture}`}
                      alt="Profile Picture"
                      width={48}
                      height={48}
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                    />
                    <div className="flex min-w-0 flex-col">
                      <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg lg:text-xl">
                        {post.userId.fullName || "Unknown User"}
                      </h3>
                      <span className="text-xs text-gray-500 sm:text-sm">
                        {new Date(post.created_at_content).toLocaleString(
                          "id-ID",
                          { dateStyle: "medium", timeStyle: "short" },
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      post.type_content === "Competition"
                        ? "rounded-full bg-[#FFB27C]/10 px-8 py-1 sm:px-8 sm:py-1"
                        : post.type_content === "Project"
                          ? "rounded-full bg-[#16A34A]/10 px-8 py-1 sm:px-8 sm:py-1"
                          : "rounded-full bg-[#5568FE]/10 px-8 py-1 sm:px-8 sm:py-1"
                    }
                  >
                    <h5
                      className={
                        post.type_content === "Competition"
                          ? "text-xs font-medium text-[#FFB27C] sm:text-sm"
                          : post.type_content === "Project"
                            ? "text-xs font-medium text-[#16A34A] sm:text-sm"
                            : "text-xs font-medium text-[#5568FE] sm:text-sm"
                      }
                    >
                      {post.type_content || "Project"}
                    </h5>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4">
                  <p className="text-sm break-words whitespace-pre-wrap text-gray-800 sm:text-base lg:text-lg">
                    {post.text_content}
                  </p>
                  {post.attachmentUrl_content && (
                    <div className="relative mt-3 aspect-video w-full">
                      <Image
                        src={`${environment.CONSTANT_URL}${post.attachmentUrl_content}`}
                        alt="Attachment"
                        layout="fill"
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="my-3 border-t border-gray-100 sm:my-4"></div>

                <div className="flex flex-col items-start justify-between gap-3 text-gray-600 sm:flex-row sm:items-center sm:gap-0">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <button
                      onClick={() => handleToggleLike(post._id)}
                      className="flex items-center gap-1.5 transition-colors duration-200 hover:text-red-500 sm:gap-2"
                    >
                      <i
                        className={`fa-heart text-lg sm:text-xl ${hasLiked ? "fa-solid text-red-500" : "fa-regular"}`}
                      ></i>
                      <span className="text-xs font-medium sm:text-sm">
                        {post.likes.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleToggleComments(post._id)}
                      className="flex items-center gap-1.5 transition-colors duration-200 hover:text-blue-600 sm:gap-2"
                    >
                      <i className="fa-regular fa-comment text-lg sm:text-xl"></i>
                      <span className="text-xs font-medium sm:text-sm">
                        {post.comments.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleShare(post._id)}
                      className="flex items-center gap-1.5 transition-colors duration-200 hover:text-gray-900 sm:gap-2"
                    >
                      <i className="fa-solid fa-share text-lg sm:text-xl"></i>
                    </button>
                  </div>
                  {post.type_content !== "All" && (
                    <button className="w-full rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto sm:px-4 sm:py-2 sm:text-sm">
                      Apply Now
                    </button>
                  )}
                </div>

                {showComments && (
                  <article className="mt-4 flex w-full flex-col sm:mt-6 lg:mt-7">
                    <div className="mb-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3 lg:gap-4">
                      <div className="h-auto w-full rounded-lg border-2 border-[#E5E7EB] bg-[#FAFAFF] px-3 sm:px-4">
                        <textarea
                          placeholder="Write a Comment"
                          className="mt-1 mb-1 w-full resize-none overflow-hidden bg-transparent text-sm focus:outline-none sm:text-base"
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
                        disabled={isSendingComment || !commentInputs[post._id]}
                        className="flex h-9 w-full flex-row items-center justify-center gap-2 rounded-lg bg-[#5568FE] text-white transition-colors hover:bg-[#5568FE]/80 disabled:cursor-not-allowed disabled:bg-gray-400 sm:h-10 sm:w-auto sm:min-w-[90px]"
                      >
                        <i className="fas fa-paper-plane text-xs sm:text-sm"></i>
                        <h2 className="text-xs font-bold sm:text-sm">
                          {isSendingComment ? "Sending..." : "Send"}
                        </h2>
                      </button>
                    </div>

                    <h1 className="mb-3 text-lg font-semibold text-[#111827] sm:mb-4 sm:text-xl">
                      Komentar
                    </h1>

                    <CommentSection postId={post._id} />
                  </article>
                )}
              </div>
            );
          })}
        </div>

        <div className="sticky top-4 hidden max-w-sm flex-col gap-4 self-start lg:flex lg:max-w-sm lg:gap-5 xl:max-w-md">
          <div className="flex max-w-sm flex-col gap-4 rounded-2xl bg-white p-4 shadow-md lg:gap-5 lg:p-6">
            <h1 className="text-xl font-bold text-[#1A1A1A] lg:text-2xl">
              Koneksi Untukmu
            </h1>
            <div className="flex flex-col gap-4 lg:gap-6">
              {suggestions.length > 0 ? (
                suggestions.slice(0, 3).map((user: any) => (
                  <div
                    key={user._id}
                    className="flex flex-row items-center gap-3 lg:gap-4"
                  >
                    <img
                      src={
                        user.profilePicture.startsWith("http")
                          ? user.profilePicture
                          : `${environment.CONSTANT_URL}${user.profilePicture}`
                      }
                      alt={user.fullName}
                      className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 object-cover lg:h-12 lg:w-12"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h2 className="truncate text-sm font-medium text-[#1A1A1A] lg:text-base">
                        {user.fullName}
                      </h2>
                      <p className="truncate text-xs text-[#7A7A7A] lg:text-sm">
                        {user.jurusan || user.status}
                      </p>
                    </div>
                    <button
                      onClick={() => onConnectClick(user._id)}
                      disabled={isConnecting && connectingUserId === user._id}
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#5568FE] px-2 py-1.5 text-xs font-semibold text-white transition hover:bg-[#5568FE]/90 disabled:opacity-70"
                    >
                      {isConnecting && connectingUserId === user._id && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      )}

                      {isConnecting && connectingUserId === user._id
                        ? "Loading..."
                        : "Berkoneksi"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Tidak ada saran saat ini.
                </p>
              )}

              {suggestions.length > 3 && (
                <h4
                  onClick={() => setShowMoreModal(true)}
                  className="mt-2 cursor-pointer text-center text-sm font-semibold text-[#5568FE] transition-colors hover:text-[#5568FE]/80 lg:text-base"
                >
                  Lihat Lebih Banyak
                </h4>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-md lg:gap-5 lg:p-6">
            <h1 className="text-xl font-bold text-[#1A1A1A] lg:text-2xl">
              Postingan Terhangat
            </h1>
            <div className="flex flex-col gap-4 lg:gap-6">
              {trendingPosts.length > 0 ? (
                trendingPosts.map((item: any) => (
                  <div
                    key={item._id}
                    onClick={() => router.push(`/dashboard/post/${item._id}`)}
                    className="-m-2 flex cursor-pointer flex-row items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 lg:gap-4"
                  >
                    <img
                      src={
                        item.user.profilePicture.startsWith("http")
                          ? item.user.profilePicture
                          : `${environment.CONSTANT_URL}${item.user.profilePicture}`
                      }
                      alt={item.user.fullName}
                      className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-200 object-cover lg:h-12 lg:w-12"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h2 className="truncate text-sm font-medium text-[#1A1A1A] lg:text-base">
                        {item.text_content.length > 30
                          ? item.text_content.substring(0, 30) + "..."
                          : item.text_content}
                      </h2>
                      <p className="truncate text-xs text-[#7A7A7A] lg:text-sm">
                        {item.user.fullName}
                      </p>
                      <p className="mt-0.5 text-[10px] text-gray-400">
                        🔥 {item.likesCount} Likes
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Belum ada postingan terhangat.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {showMoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Semua Saran Koneksi</h2>
              <button
                onClick={() => setShowMoreModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="flex max-h-[400px] flex-col gap-4 overflow-y-auto">
              {suggestions.map((user: any) => (
                <div key={user._id} className="flex items-center gap-3">
                  <img
                    src={
                      user.profilePicture.startsWith("http")
                        ? user.profilePicture
                        : `${environment.CONSTANT_URL}${user.profilePicture}`
                    }
                    alt={user.fullName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{user.fullName}</h3>
                    <p className="text-xs text-gray-500">
                      {user.jurusan || user.status}
                    </p>
                  </div>
                  <button
                    onClick={() => onConnectClick(user._id)}
                    disabled={isConnecting && connectingUserId === user._id}
                    className="rounded-lg bg-[#5568FE] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {isConnecting && connectingUserId === user._id
                      ? "Loading..."
                      : "Berkoneksi"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default HomePage;
