import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import socket from "../../libs/socket/instance";
import connectionServices from "@/services/connection.service";
import messageServices from "@/services/message.service";
import { IUser, IConnection } from "@/types/Home";
import { IMessage } from "@/types/Message";

const useMessage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);

  const currentUserId = session?.user?.id;
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!currentUserId) return;

    socket.emit("join", currentUserId);

    socket.on("receive-message", (msg: IMessage) => {
      if (msg.senderId === selectedUser?._id) {
        queryClient.setQueryData<IMessage[]>(
          ["messages", msg.senderId],
          (old = []) => [...old, msg],
        );
      }
    });

    return () => {
      socket.off("receive-message");
    };
  }, [currentUserId, selectedUser, queryClient]);

  const { data: connections = [], isLoading: isLoadingConversations } =
    useQuery<IConnection[]>({
      queryKey: ["connections"],
      queryFn: connectionServices.getConnections,
      enabled: !!currentUserId,
    });

  const conversations: IUser[] = connections
    .filter((x) => x.status === "accepted")
    .map((x) => x.user);

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<
    IMessage[]
  >({
    queryKey: ["messages", selectedUser?._id],
    queryFn: () => messageServices.getMessages(selectedUser!._id),
    enabled: !!selectedUser,
  });

  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: (variables: { receiverId: string; text: string }) => {
      socket.emit("send-message", {
        senderId: currentUserId,
        receiverId: variables.receiverId,
        text: variables.text,
      });

      return messageServices.sendMessage(variables.receiverId, variables.text);
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", variables.receiverId],
      });

      const previousMessages = queryClient.getQueryData<IMessage[]>([
        "messages",
        variables.receiverId,
      ]);

      const optimisticMessage: IMessage = {
        _id: "temp-" + Date.now(),
        senderId: currentUserId!,
        receiverId: variables.receiverId,
        text: variables.text,
        created_at_message: new Date().toISOString(),
        status_message: false,
      };

      queryClient.setQueryData<IMessage[]>(
        ["messages", variables.receiverId],
        (old = []) => [...old, optimisticMessage],
      );

      return { previousMessages };
    },

    onError: (_err, vars, ctx) => {
      if (ctx?.previousMessages) {
        queryClient.setQueryData(
          ["messages", vars.receiverId],
          ctx.previousMessages,
        );
      }

      setToaster({
        type: "error",
        message: "Gagal mengirim pesan.",
      });
    },

    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", vars.receiverId],
      });
    },
  });

  const handleSelectUser = (user: IUser) => {
    setSelectedUser(user);
  };

  return {
    conversations,
    messages,
    selectedUser,
    currentUserId,

    isLoadingConversations,
    isLoadingMessages,
    isSendingMessage,

    handleSelectUser,
    sendMessage,
  };
};

export default useMessage;
