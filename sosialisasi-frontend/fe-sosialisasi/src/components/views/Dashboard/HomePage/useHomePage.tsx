import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import contentServices from "@/services/content.service";
import { IPost } from "@/types/Home";

const useHomePage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: contentServices.getAllPosts,
    enabled: !!session,
  });

  const { mutate: mutateToggleLike } = useMutation({
    mutationFn: (postId: string) => contentServices.toggleLike(postId),

    onMutate: async (postId: string) => {
      const userId = session?.user?.id;
      console.log(userId);
      if (!userId) return;

      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<IPost[]>(["posts"]);

      queryClient.setQueryData<IPost[]>(["posts"], (oldData = []) =>
        oldData.map((post) => {
          if (post._id === postId) {
            const hasLiked = post.likes.includes(userId);
            const newLikes = hasLiked
              ? post.likes.filter((id) => id !== userId)
              : [...post.likes, userId];
            return { ...post, likes: newLikes };
          }
          return post;
        }),
      );

      return { previousPosts };
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    posts,
    isLoading,
    currentUserId: session?.user?.id,
    handleToggleLike: mutateToggleLike,
  };
};

export default useHomePage;
