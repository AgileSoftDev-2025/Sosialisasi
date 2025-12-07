import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContext";

import socket from "../../libs/socket/instance";
import connectionServices from "@/services/connection.service";
import messageServices from "@/services/message.service";

import { IUser, IConnection } from "@/types/Home";
import { IMessage } from "@/types/Message";

const safeId = (id: any): string => {
  if (!id) return "";
  if (typeof id === "string") return id;
  if (typeof id === "number") return id.toString();
  if (typeof id === "object" && "toString" in id) return id.toString();
  return String(id);
};

function parseSafeDate(value: any): string {
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

const useMessage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { setToaster } = useContext(ToasterContext);

  const currentUserId = session?.user?.id;
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // NEW: daftar user online
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // JOIN ROOM
  useEffect(() => {
    if (!currentUserId) return;

    socket.emit("joinRoom", currentUserId);

    return () => {
      socket.off("joinRoom");
    };
  }, [currentUserId]);

  // NEW: LISTENER USER ONLINE
  useEffect(() => {
    const handleOnlineUsers = (list: string[]) => {
      setOnlineUsers(list.map((x) => safeId(x)));
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, []);

  // RECEIVE MESSAGE
  useEffect(() => {
    const handleReceive = (msg: IMessage) => {
      const sender =
        typeof msg.senderId === "object"
          ? (msg.senderId as any).toString()
          : msg.senderId;

      const formatted: IMessage = {
        ...msg,
        created_at_message: parseSafeDate(msg.created_at_message),
      };

      queryClient.setQueryData<IMessage[]>(
        ["messages", sender],
        (old: IMessage[] = []) => {
          const cleaned = old.filter((m) => !safeId(m._id).startsWith("temp-"));
          return [...cleaned, formatted];
        }
      );
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [queryClient]);

  // GET CONNECTIONS
  const { data: connections = [], isLoading: isLoadingConversations } =
    useQuery<IConnection[]>({
      queryKey: ["connections"],
      queryFn: connectionServices.getConnections,
      enabled: !!currentUserId,
    });

  const conversations: IUser[] = connections
    .filter((x) => x.status === "accepted")
    .map((x) => x.user);

  // GET MESSAGES
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery<
    IMessage[]
  >({
    queryKey: ["messages", selectedUser?._id],
    queryFn: () =>
      selectedUser ? messageServices.getMessages(selectedUser._id) : [],
    enabled: !!selectedUser,
  });

  // SEND MESSAGE
  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: async (variables: { receiverId: string; text: string }) => {
      socket.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: variables.receiverId,
        text: variables.text,
      });

      return await messageServices.sendMessage(
        variables.receiverId,
        variables.text
      );
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", variables.receiverId],
      });

      const previousMessages =
        queryClient.getQueryData<IMessage[]>([
          "messages",
          variables.receiverId,
        ]) || [];

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
        (old: IMessage[] = []) => [...old, optimisticMessage]
      );

      return { previousMessages };
    },

    onError: (_err, vars, ctx) => {
      if (ctx?.previousMessages) {
        queryClient.setQueryData(
          ["messages", vars.receiverId],
          ctx.previousMessages
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

  
    onlineUsers,
  };
};

export default useMessage;
