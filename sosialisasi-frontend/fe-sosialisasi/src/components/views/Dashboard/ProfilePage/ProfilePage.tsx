import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import useProfile from "../../../hooks/useProfile";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import useHomePage from "../../../hooks/useHomePage";
import CommentSection from "../HomePage/CommentSectionPage";
import { IConnection } from "@/types/Home";
import environment from "@/config/environment";

const Profile = () => {
  const router = useRouter();

  const {
    profile,
    isLoading,
    posts,
    isLoadingPosts,
    connections,
    handleRemoveConnection,
    handleDeletePost,
  } = useProfile();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    currentUserId,
    visibleComments,
    commentInputs,
    isSendingComment,
    handleToggleLike,
    handleToggleComments,
    handleInputChange,
    handleSendComment,
    handleShare,
  } = useHomePage();

  const topPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts]
      .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
      .slice(0, 3);
  }, [posts]);

  const toggleMenu = (postId: string) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex w-full flex-col gap-4 bg-gray-50 p-2 sm:gap-6 sm:p-4 lg:p-6">
          <div className="p-10 text-center">Loading Profile...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative flex w-full flex-col gap-4 bg-gray-50 p-2 sm:gap-6 sm:p-4 lg:p-6">
        {isOpenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm transition-opacity">
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col gap-4 rounded-2xl bg-[#F8F9FB] p-6 shadow-2xl">
              <div className="flex items-center justify-between rounded-xl bg-white p-4">
                <h2 className="font-bold">Semua Koneksi</h2>
                <button onClick={toggleModal}>
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto p-2">
                {connections.map((conn: any) => (
                  <div
                    key={conn._id}
                    className="flex items-center justify-between rounded-xl bg-white p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          conn.user?.profilePicture
                            ? `${environment.CONSTANT_URL}${conn.user.profilePicture}`
                            : "/images/logo.png"
                        }
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold">{conn.user?.fullName}</p>
                        <p className="text-xs text-gray-500">
                          {conn.user?.jurusan}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm("Hapus koneksi?"))
                          handleRemoveConnection(conn.user._id);
                      }}
                      className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-500 hover:bg-red-50"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid w-full grid-cols-1 gap-4 px-2 sm:gap-6 sm:px-4 md:px-6 lg:grid-cols-[7fr_3fr] lg:px-8 xl:px-12">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            <article className="rounded-lg bg-white p-4 shadow-md sm:rounded-2xl sm:p-6 md:p-8 lg:p-10">
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:flex-row md:items-start md:justify-start">
                <Image
                  src={
                    profile?.profilePicture
                      ? `${environment.CONSTANT_URL}${profile.profilePicture}`
                      : "/images/logo.png"
                  }
                  alt={profile?.fullName || "User Avatar"}
                  width={160}
                  height={160}
                  className="h-24 w-24 flex-shrink-0 rounded-full object-cover sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40"
                />
                <div className="flex w-full flex-col gap-2 text-center sm:gap-3 md:flex-1 md:text-left">
                  <h1 className="text-xl font-bold break-words text-[#1A1A1A] sm:text-2xl md:text-3xl lg:text-[32px]">
                    {profile?.fullName}
                  </h1>
                  <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-[#7A7A7A] md:justify-start">
                    <i className="fa-solid fa-graduation-cap text-base sm:text-lg lg:text-[20px]"></i>
                    <h3 className="font-regular text-sm sm:text-base lg:text-[20px]">
                      <span>{profile?.status}</span>{" "}
                      <span>{profile?.jurusan}</span> -{" "}
                      <span>{profile?.universitas}</span>
                    </h3>
                  </div>
                  <p className="mt-1 mb-2 text-sm font-semibold text-[#7A7A7A] sm:text-base lg:text-[20px]">
                    {connections.length} Koneksi
                  </p>

                  <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3 md:justify-start lg:gap-5">
                    <div className="flex w-full flex-row items-center justify-center gap-2 rounded-lg border-2 border-[#5568FE] px-3 py-2 transition-colors hover:bg-[#5568FE]/5 sm:w-auto sm:rounded-xl sm:px-4">
                      <Image
                        src={"/images/Linkedin.png"}
                        width={20}
                        height={20}
                        alt="Linkedin"
                        className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                      <p className="text-sm font-medium text-[#5568FE] sm:text-base">
                        <a
                          href={profile?.linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Linkedin
                        </a>
                      </p>
                    </div>
                    <button
                      className="flex w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-[#5568FE] px-3 py-2 transition-colors hover:bg-[#5568FE]/90 sm:w-auto sm:rounded-xl sm:px-4"
                      onClick={() => router.push("/dashboard/edit-profile")}
                    >
                      <p className="text-sm font-bold text-white sm:text-base lg:text-[19px]">
                        Edit Profil
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            <div className="mb-5 flex w-full flex-col gap-4 rounded-lg bg-white p-3 shadow-md sm:gap-6 sm:rounded-2xl sm:p-4 lg:gap-7 lg:p-6">
              <h1 className="text-xl font-semibold text-[#1A1A1A] sm:text-2xl lg:text-[28px]">
                Postingan
              </h1>
              {isLoadingPosts ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => {
                  const showMenu = openMenu === post._id;
                  const hasLiked = currentUserId
                    ? post.likes.includes(currentUserId)
                    : false;
                  const showComments = visibleComments[post._id] || false;

                  return (
                    <article
                      key={post._id}
                      className="mb-6 flex flex-col border-b pb-6 last:mb-0 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex min-w-0 flex-1 flex-row items-center gap-3 sm:gap-4">
                          <img
                            src={
                              post.userId?.profilePicture
                                ? `${environment.CONSTANT_URL}${post.userId.profilePicture}`
                                : "/images/logo.png"
                            }
                            alt="User"
                            className="h-9 w-9 flex-shrink-0 rounded-full bg-black object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
                          />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <h3 className="truncate text-sm font-semibold text-[#202020] sm:text-base lg:text-xl">
                              {post.userId?.fullName}
                            </h3>
                            <h4 className="text-xs text-[#787878] sm:text-[13px] lg:text-[15px]">
                              {new Date(
                                post.created_at_content,
                              ).toLocaleDateString("id-ID", {
                                dateStyle: "medium",
                              })}
                            </h4>
                          </div>
                        </div>
                        <div className="relative self-end sm:self-auto">
                          <i
                            className="fa-solid fa-ellipsis-vertical cursor-pointer p-2 text-lg"
                            onClick={() => toggleMenu(post._id)}
                          ></i>
                          {showMenu && (
                            <div className="absolute right-0 z-10 mt-2 w-32 rounded-lg border bg-white shadow-lg">
                              <button
                                onClick={() => {
                                  if (confirm("Hapus postingan ini?")) {
                                    handleDeletePost(post._id);
                                    setOpenMenu(null);
                                  }
                                }}
                                className="block w-full rounded-lg px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                              >
                                Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <p className="text-sm break-words whitespace-pre-wrap text-[#202020] sm:text-base lg:text-lg">
                          {post.text_content}
                        </p>
                      </div>
                      {post.attachmentUrl_content && (
                        <img
                          src={`${environment.CONSTANT_URL}${post.attachmentUrl_content}`}
                          alt="Attachment"
                          className="mt-3 max-h-96 w-full rounded-lg object-cover sm:rounded-xl"
                        />
                      )}

                      <div className="mt-3 flex items-center gap-6 text-gray-600">
                        <button
                          onClick={() => handleToggleLike(post._id)}
                          className="flex items-center gap-2 hover:text-red-500"
                        >
                          <i
                            className={`fa-heart text-lg ${hasLiked ? "fa-solid text-red-500" : "fa-regular"}`}
                          ></i>
                          <span>{post.likes.length}</span>
                        </button>
                        <button
                          onClick={() => handleToggleComments(post._id)}
                          className="flex items-center gap-2 hover:text-blue-500"
                        >
                          <i className="fa-regular fa-comment text-lg"></i>
                          <span>{post.comments?.length || 0}</span>
                        </button>
                      </div>

                      {showComments && (
                        <div className="mt-4 rounded-xl bg-gray-50 p-4">
                          <CommentSection postId={post._id} />
                          <div className="mt-3 flex gap-2">
                            <input
                              className="flex-1 rounded-lg border px-3 py-2 text-sm"
                              placeholder="Tulis komentar..."
                              value={commentInputs[post._id] || ""}
                              onChange={(e) =>
                                handleInputChange(post._id, e.target.value)
                              }
                            />
                            <button
                              disabled={isSendingComment}
                              onClick={() => handleSendComment(post._id)}
                              className="rounded-lg bg-[#5568FE] px-4 py-2 text-sm font-bold text-white disabled:bg-gray-400"
                            >
                              Kirim
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                <p className="text-center text-sm text-gray-500">
                  Belum ada postingan.
                </p>
              )}
            </div>
          </div>

          <div className="hidden w-full flex-col gap-4 sm:gap-5 lg:top-24 lg:flex lg:self-start">
            <div className="flex flex-col gap-4 rounded-lg bg-white p-3 shadow-md sm:gap-5 sm:rounded-2xl sm:p-4 md:p-6 lg:p-8">
              <h1 className="text-lg font-bold text-[#1A1A1A] sm:text-xl lg:text-[24px]">
                Koneksi
              </h1>
              <div className="flex flex-col gap-4 sm:gap-5">
                {connections.length > 0 ? (
                  connections.slice(0, 5).map((conn: any) => (
                    <div
                      key={conn._id}
                      className="group relative flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                    >
                      <div
                        className="flex flex-1 cursor-pointer items-center gap-3"
                        onClick={() =>
                          router.push(`/dashboard/profileuser/${conn.user._id}`)
                        }
                      >
                        <img
                          src={
                            conn.user?.profilePicture
                              ? `${environment.CONSTANT_URL}${conn.user.profilePicture}`
                              : "/images/logo.png"
                          }
                          className="h-10 w-10 flex-shrink-0 rounded-full bg-black object-cover sm:h-12 sm:w-12"
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h2 className="truncate text-sm font-medium text-[#1A1A1A] sm:text-base">
                            {conn.user?.fullName}
                          </h2>
                          <p className="truncate text-xs text-[#7A7A7A] sm:text-sm">
                            {conn.user?.jurusan || "Mahasiswa"}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            confirm(
                              `Hapus koneksi dengan ${conn.user.fullName}?`,
                            )
                          ) {
                            handleRemoveConnection(conn.user._id);
                          }
                        }}
                        className="p-2 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
                        title="Hapus Koneksi"
                      >
                        <i className="fa-solid fa-user-minus"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Belum ada koneksi.</p>
                )}

                {connections.length > 5 && (
                  <h4
                    onClick={toggleModal}
                    className="mt-2 cursor-pointer text-center text-sm font-semibold text-[#5568FE] transition-colors hover:text-[#5568FE]/80 sm:text-base"
                  >
                    Lihat Lebih Banyak
                  </h4>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg bg-white p-3 shadow-md sm:gap-5 sm:rounded-2xl sm:p-4 md:p-6 lg:p-8">
              <h1 className="text-lg font-bold text-[#1A1A1A] sm:text-xl lg:text-[24px]">
                Postingan Terfavorit
              </h1>
              <div className="flex flex-col gap-4 sm:gap-5">
                {topPosts.length > 0 ? (
                  topPosts.map((post) => (
                    <div
                      key={post._id}
                      className="flex cursor-pointer flex-row items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 sm:gap-4"
                      onClick={() => router.push(`/dashboard/post/${post._id}`)}
                    >
                      <img
                        src={
                          post.userId?.profilePicture
                            ? `${environment.CONSTANT_URL}${post.userId.profilePicture}`
                            : "/images/logo.png"
                        }
                        className="h-10 w-10 flex-shrink-0 rounded-lg bg-black object-cover sm:h-12 sm:w-12"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <h2 className="line-clamp-2 text-sm font-medium break-words text-[#1A1A1A] sm:text-base">
                          {post.text_content}
                        </h2>
                        <p className="text-xs text-[#7A7A7A] sm:text-sm">
                          {post.likes.length} Likes
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Belum ada postingan populer.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
