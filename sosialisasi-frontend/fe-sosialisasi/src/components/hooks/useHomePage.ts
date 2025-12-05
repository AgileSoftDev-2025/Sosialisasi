import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import contentServices from "@/services/content.service";
import { IContentFilters, IPost, ISearchResult } from "@/types/Home";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useSearch } from "@/contexts/SearchContext";
import { useContext } from "react";
import connectionServices from "@/services/connection.service";

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
  const { searchTerm, setSearchTerm } = useSearch();
  const isSearching = !!searchTerm;
  const [filters, setFilters] = useState<IContentFilters>({});

  const { data: allPostsData = [], isLoading: isLoadingAllPosts } = useQuery<
    IPost[]
  >({
    queryKey: ["posts", filters],
    queryFn: () => {
      return contentServices.getAllPosts(filters);
    },
    enabled: !!session && !isSearching,
  });

  const { data: searchResults, isLoading: isLoadingSearch } =
    useQuery<ISearchResult>({
      queryKey: ["search", searchTerm],
      queryFn: () => contentServices.searchAll(searchTerm),
      enabled: !!session && isSearching,
    });

  const { data: suggestions = [], isLoading: isLoadingSuggestions } = useQuery({
    queryKey: ["connections-suggestions"],
    queryFn: connectionServices.getSuggestions,
    enabled: !!session,
  });

  const { data: trendingPosts = [], isLoading: isLoadingTrending } = useQuery({
    queryKey: ["trending-posts"],
    queryFn: contentServices.getTrendingPosts,
    enabled: !!session,
  });

  const posts = isSearching ? searchResults?.contents || [] : allPostsData;
  const users = isSearching ? searchResults?.users || [] : [];
  const isLoadingPosts = isSearching ? isLoadingSearch : isLoadingAllPosts;

  const { mutate: sendConnectionRequest, isPending: isConnecting } =
    useMutation({
      mutationFn: (targetId: string) =>
        connectionServices.toggleConnection(targetId),
      onSuccess: () => {
        setToaster({
          type: "success",
          message: "Permintaan koneksi terkirim!",
        });
        queryClient.invalidateQueries({
          queryKey: ["connections-suggestions"],
        });
      },
      onError: (error: any) => {
        setToaster({
          type: "error",
          message:
            error?.response?.data?.message || "Gagal mengirim permintaan.",
        });
      },
    });

  const { mutate: handleToggleLike } = useMutation({
    mutationFn: contentServices.toggleLike,
    onMutate: async (postId: string) => {
      const userId = session?.user?.id;
      if (!userId) return;
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      await queryClient.cancelQueries({ queryKey: ["user-posts"] });
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      const previousPosts = queryClient.getQueryData<IPost[]>(["posts"]);
      const previousUserPosts = queryClient.getQueryData<IPost[]>([
        "user-posts",
      ]);
      const previousPost = queryClient.getQueryData<IPost>(["post", postId]);

      const optimisticUpdate = (post: IPost) => {
        if (post._id !== postId) return post;
        return {
          ...post,
          likes: post.likes.includes(userId)
            ? post.likes.filter((id) => id !== userId)
            : [...post.likes, userId],
        };
      };

      queryClient.setQueryData<IPost[]>(["posts"], (oldData = []) =>
        oldData.map(optimisticUpdate),
      );

      queryClient.setQueryData<IPost[]>(["user-posts"], (oldData = []) =>
        oldData.map(optimisticUpdate),
      );

      if (previousPost) {
        queryClient.setQueryData<IPost>(
          ["post", postId],
          optimisticUpdate(previousPost),
        );
      }

      return { previousPosts, previousUserPosts, previousPost };
    },

    onError: (_, postId, context) => {
      if (context?.previousPosts)
        queryClient.setQueryData(["posts"], context.previousPosts);
      if (context?.previousUserPosts)
        queryClient.setQueryData(["user-posts"], context.previousUserPosts);
      if (context?.previousPost)
        queryClient.setQueryData(["post", postId], context.previousPost);
    },

    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  const { mutate: sendComment, isPending: isSendingComment } = useMutation({
    mutationFn: contentServices.createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });

      setCommentInputs((prev) => ({ ...prev, [variables.postId]: "" }));
    },

    onError: () => {
      setToaster({ type: "error", message: "Gagal mengirim komentar." });
    },
  });

  const handleConnect = (targetId: string) => {
    sendConnectionRequest(targetId);
  };

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
    users,
    isSearching,
    isLoadingPosts,
    searchTerm,
    currentUserId: session?.user?.id,
    session,
    visibleComments,
    commentInputs,
    isSendingComment,
    filters,
    suggestions,
    isLoadingSuggestions,
    isConnecting,
    trendingPosts,
    isLoadingTrending,
    handleConnect,
    setSearchTerm,
    setFilters,
    handleToggleLike,
    handleToggleComments,
    handleInputChange,
    handleSendComment,
    handleShare,
  };
};

export default useHomePage;
