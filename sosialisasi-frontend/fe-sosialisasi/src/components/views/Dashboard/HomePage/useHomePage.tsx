import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import contentServices from "@/services/content.service";
import { IPost, IComment } from "@/types/Home";
import { useState } from "react";

const useHomePage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [visibleComments, setVisibleComments] = useState<
    Record<string, boolean>
  >({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {},
  );
  const [commentsByPost, setCommentsByPost] = useState<
    Record<string, IComment[]>
  >({});
  const [loadingComments, setLoadingComments] = useState<
    Record<string, boolean>
  >({});

  const { data: posts = [], isLoading } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: contentServices.getAllPosts,
    enabled: !!session,
  });

  const { mutate: handleToggleLike } = useMutation({
    mutationFn: (postId: string) => contentServices.toggleLike(postId),
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
    onError: (err, _, context) => {
      if (context?.previousPosts)
        queryClient.setQueryData(["posts"], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleToggleComments = async (postId: string) => {
    const isCurrentlyVisible = visibleComments[postId] || false;

    setVisibleComments((prev) => ({ ...prev, [postId]: !isCurrentlyVisible }));

    if (!isCurrentlyVisible) {
      setLoadingComments((prev) => ({ ...prev, [postId]: true }));

      try {
        const token = session?.user?.accessToken;
        if (!token) throw new Error("Token tidak ditemukan");

        const res = await fetch(
          `http://localhost:3001/api/comment/comment/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const result = await res.json();

        setCommentsByPost((prev) => ({
          ...prev,
          [postId]: result.data || [],
        }));
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoadingComments((prev) => ({ ...prev, [postId]: false }));
      }
    }
  };

  const fetchComments = async (postId: string) => {
    setLoadingComments((prev) => ({ ...prev, [postId]: true }));
    try {
      const token = session?.user?.accessToken;
      if (!token) throw new Error("Token tidak ditemukan");

      const res = await fetch(
        `http://localhost:3001/api/comment/comment/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const result = await res.json();

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: result.data || [],
      }));
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoadingComments((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleInputChange = (postId: string, text: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: text }));
  };

  const handleSendComment = async (postId: string) => {
    const text_comment = commentInputs[postId]?.trim();
    if (!text_comment) return;

    const user = session?.user;
    const token = session?.user?.accessToken;
    if (!user || !token) return;

    try {
      const res = await fetch(
        `http://localhost:3001/api/comment/comment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            text_comment,
            id_user: user.id,
          }),
        },
      );

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const result = await res.json();
      const newComment = result.data;

      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      }));

      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));

      await queryClient.invalidateQueries({ queryKey: ["posts"] });

      await fetchComments(postId);
    } catch (err) {
      console.error("Error sending comment:", err);
    }
  };

  const handleShare = async (postId: string) => {
    try {
      const url = `${window.location.origin}/post/${postId}`;

      await navigator.clipboard.writeText(url);
      alert(`Link copied: ${url}`);

      const token = session?.user?.accessToken;
      const res = await fetch(`http://localhost:3001/api/content/${postId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch content");
      const data = await res.json();

      console.log("Fetched content for preview:", data.data);
    } catch (err) {
      console.error("Error sharing content:", err);
      alert("Failed to share content");
    }
  };

  return {
    posts,
    isLoading,
    currentUserId: session?.user?.id,
    handleToggleLike,
    handleToggleComments,
    handleSendComment,
    handleInputChange,
    visibleComments,
    commentsByPost,
    commentInputs,
    loadingComments,
    handleShare,
  };
};

export default useHomePage;
