import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface Message {
  id: string;
  sender: string;
  senderRole: string;
  senderAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
}

const MessagesPage = () => {
  // State untuk conversation yang dipilih
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [messageInput, setMessageInput] = useState<string>("");

  // Dummy data untuk conversations list
  const conversations: Message[] = [
    {
      id: "1",
      sender: "Dr. Sarah Chen",
      senderRole: "Lecturer • Computer Science",
      senderAvatar: "/images/avatar1.jpg",
      lastMessage: "Thanks for sharing the resea...",
      timestamp: "2m",
      unread: false,
    },
    {
      id: "2",
      sender: "Alex Rodriguez",
      senderRole: "Student",
      senderAvatar: "/images/avatar2.jpg",
      lastMessage: "Hey! Are you free for the gro...",
      timestamp: "15m",
      unread: false,
    },
    {
      id: "3",
      sender: "Emma Thompson",
      senderRole: "Research Assistant",
      senderAvatar: "/images/avatar3.jpg",
      lastMessage: "The lab results are ready for...",
      timestamp: "1h",
      unread: false,
    },
    {
      id: "4",
      sender: "Prof. Michael Johnson",
      senderRole: "Professor",
      senderAvatar: "/images/avatar4.jpg",
      lastMessage: "Your thesis proposal looks p...",
      timestamp: "3h",
      unread: false,
    },
    {
      id: "5",
      sender: "Lisa Park",
      senderRole: "Student",
      senderAvatar: "/images/avatar5.jpg",
      lastMessage: "Can you help me with the st...",
      timestamp: "1d",
      unread: false,
    },
  ];

  // Dummy data untuk chat messages
  const chatMessages: ChatMessage[] = [
    {
      id: "1",
      text: "Hi! I wanted to discuss the research methodology for your upcoming project. Do you have some time this week?",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      text: "Yes, absolutely! I'm free tomorrow afternoon or Thursday morning. Which works better for you?",
      time: "10:32 AM",
      isOwn: true,
    },
  ];

  // Get selected conversation data
  const selectedChat = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Logic untuk send message akan ditambahkan disini
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-100px)] w-full overflow-hidden rounded-3xl bg-white shadow-sm">
        {/* LEFT SIDEBAR - Conversations List */}
        <div className="flex w-full max-w-[400px] flex-col border-r border-gray-200">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-[#202020]">Messages</h1>
            
            {/* Search Bar */}
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
              <i className="fa-solid fa-search text-gray-400"></i>
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={cn(
                  "cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-gray-50",
                  selectedConversation === conversation.id && "bg-blue-50"
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <img
                    src={conversation.senderAvatar || "/images/logo.png"}
                    alt={conversation.sender}
                    className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 object-cover"
                  />

                  {/* Content */}
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-semibold text-[#202020]">
                        {conversation.sender}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {conversation.senderRole}
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-600">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          {selectedChat && (
            <div className="flex items-center gap-4 border-b border-gray-200 p-6">
              <img
                src={selectedChat.senderAvatar || "/images/logo.png"}
                alt={selectedChat.sender}
                className="h-12 w-12 rounded-full bg-gray-200 object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-[#202020]">
                  {selectedChat.sender}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedChat.senderRole}
                </p>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.isOwn ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3",
                      msg.isOwn
                        ? "bg-[#5568FE] text-white"
                        : "bg-white text-[#202020]"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        msg.isOwn ? "text-blue-100" : "text-gray-500"
                      )}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              {/* Attachment Button */}
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100">
                <i className="fa-solid fa-paperclip text-lg"></i>
              </button>

              {/* Input Field */}
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Write a message..."
                className="flex-1 rounded-full bg-gray-100 px-6 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5568FE]"
              />

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5568FE] text-white transition-colors hover:bg-[#5568FE]/80"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;