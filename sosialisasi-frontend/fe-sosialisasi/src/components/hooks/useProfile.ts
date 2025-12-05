import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "@/services/auth.service";
import { useSession } from "next-auth/react";
import contentServices from "@/services/content.service";
import connectionServices from "@/services/connection.service";
import { IPost, IConnection } from "@/types/Home";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";

const useProfile = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);

  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: authServices.getProfile,
  });

  const { data: posts = [], isLoading: isLoadingPosts } = useQuery<IPost[]>({
    queryKey: ["user-posts"],
    queryFn: contentServices.getPostsByUserId,
    enabled: !!session,
  });

  const { data: connections = [], isLoading: isLoadingConnections } = useQuery({
    queryKey: ["my-connections"],
    queryFn: connectionServices.getConnections,
    enabled: !!session,
  });

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: contentServices.deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
      setToaster({ type: "success", message: "Postingan berhasil dihapus." });
    },
    onError: () => {
      setToaster({ type: "error", message: "Gagal menghapus postingan." });
    },
  });

  const { mutate: handleRemoveConnection } = useMutation({
    mutationFn: (targetId: string) =>
      connectionServices.removeConnection(targetId),
    onSuccess: () => {
      setToaster({ type: "success", message: "Koneksi berhasil dihapus." });
      queryClient.invalidateQueries({ queryKey: ["my-connections"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      setToaster({ type: "error", message: "Gagal menghapus koneksi." });
    },
  });

  return {
    profile: profileResponse?.data?.data,
    posts,
    connections,
    isLoading,
    isLoadingPosts,
    isLoadingConnections,
    handleDeletePost,
    handleRemoveConnection,
  };
};

export default useProfile;
