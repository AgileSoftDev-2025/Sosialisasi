import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import contentServices from "@/services/content.service";
import { IPost } from "@/types/Home";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";

const useHomePage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);
  const [visibleComments, setVisibleComments] = useState<
    Record<string, boolean>
  >({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {},
  );

  const { data: posts = [], isLoading: isLoadingPosts } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: contentServices.getAllPosts,
    enabled: !!session,
  });

  const { mutate: handleToggleLike } = useMutation({
    mutationFn: contentServices.toggleLike,
    onMutate: async (postId: string) => {
      const userId = session?.user?.id;
      if (!userId) return;
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<IPost[]>(["posts"]);
      queryClient.setQueryData<IPost[]>(["posts"], (oldData = []) =>
        oldData.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(userId)
                  ? post.likes.filter((id) => id !== userId)
                  : [...post.likes, userId],
              }
            : post,
        ),
      );
      return { previousPosts };
    },
    onError: (_, __, context) => {
      if (context?.previousPosts)
        queryClient.setQueryData(["posts"], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: sendComment, isPending: isSendingComment } = useMutation({
    mutationFn: contentServices.createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setCommentInputs((prev) => ({ ...prev, [variables.postId]: "" }));
    },
    onError: () => {
      setToaster({ type: "error", message: "Gagal mengirim komentar." });
    },
  });

  const handleSendComment = (postId: string) => {
    const text_comment = commentInputs[postId]?.trim();
    if (!text_comment) return;
    sendComment({ postId, text_comment });
  };

  const handleToggleComments = (postId: string) => {
    setVisibleComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleInputChange = (postId: string, text: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: text }));
  };

  const handleShare = (postId: string) => {
    const url = `${window.location.origin}/dashboard/post/${postId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setToaster({ type: "success", message: "Link copied to clipboard!" });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        setToaster({ type: "error", message: "Failed to copy link." });
      });
  };

  return {
    posts,
    isLoadingPosts,
    currentUserId: session?.user?.id,
    session,
    visibleComments,
    commentInputs,
    isSendingComment,
    handleToggleLike,
    handleToggleComments,
    handleInputChange,
    handleSendComment,
    handleShare,
  };
};

export default useHomePage;
