import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";

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
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [messageInput, setMessageInput] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const conversations: Message[] = [
    {
      id: "1",
      sender: "Dr. Sarah Chen",
      senderRole: "Lecturer • Computer Science",
      senderAvatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Thanks for sharing the resea...",
      timestamp: "2m",
      unread: false,
    },
    {
      id: "2",
      sender: "Alex Rodriguez",
      senderRole: "Student",
      senderAvatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "Hey! Are you free for the gro...",
      timestamp: "15m",
      unread: false,
    },
    {
      id: "3",
      sender: "Emma Thompson",
      senderRole: "Research Assistant",
      senderAvatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "The lab results are ready for...",
      timestamp: "1h",
      unread: false,
    },
    {
      id: "4",
      sender: "Prof. Michael Johnson",
      senderRole: "Professor",
      senderAvatar: "https://i.pravatar.cc/150?img=4",
      lastMessage: "Your thesis proposal looks p...",
      timestamp: "3h",
      unread: false,
    },
    {
      id: "5",
      sender: "Lisa Park",
      senderRole: "Student",
      senderAvatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "Can you help me with the st...",
      timestamp: "1d",
      unread: false,
    },
  ];

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
    {
      id: "3",
      text: "Thursday morning works great for me! Should we meet at the library or your office?",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: "4",
      text: "Let's meet at the library, 2nd floor study room. See you at 10 AM?",
      time: "10:36 AM",
      isOwn: true,
    },
  ];

  const selectedChat = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    // Di mobile, hide sidebar setelah memilih conversation
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleBackToList = () => {
    setShowSidebar(true);
  };

  return (
    <DashboardLayout>
      {/* Mobile Full Screen */}
      <div className="flex h-[100dvh] bg-white md:h-[calc(100vh-100px)] md:rounded-3xl md:shadow-sm">
        <div className="flex h-full w-full overflow-hidden">
          {/* LEFT SIDEBAR - Conversations List */}
          <div
            className={`${
              showSidebar ? "flex" : "hidden"
            } h-full w-full flex-col border-r border-gray-200 md:flex md:w-80 lg:w-96 xl:w-[400px]`}
          >
            {/* Header */}
            <div className="border-b border-gray-200 p-4 md:p-6">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Messages
              </h1>

              {/* Search Bar */}
              <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
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
                  onClick={() => handleSelectConversation(conversation.id)}
                  className={`cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <img
                      src={conversation.senderAvatar}
                      alt={conversation.sender}
                      className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 object-cover"
                    />

                    {/* Content */}
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-start justify-between">
                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {conversation.sender}
                        </h3>
                        <span className="ml-2 flex-shrink-0 text-xs text-gray-500">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="truncate text-xs text-gray-500">
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
          <div
            className={`${
              !showSidebar ? "flex" : "hidden"
            } h-full w-full flex-1 flex-col md:flex`}
          >
            {/* Chat Header */}
            {selectedChat && (
              <div className="flex items-center gap-3 border-b border-gray-200 p-4 md:p-6">
                {/* Back Button (Mobile Only) */}
                <button
                  onClick={handleBackToList}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 md:hidden"
                >
                  <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <img
                  src={selectedChat.senderAvatar}
                  alt={selectedChat.sender}
                  className="h-12 w-12 rounded-full bg-gray-200 object-cover"
                />
                <div className="flex-1 overflow-hidden">
                  <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                    {selectedChat.sender}
                  </h2>
                  <p className="truncate text-xs text-gray-500 sm:text-sm">
                    {selectedChat.senderRole}
                  </p>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] md:max-w-[70%] ${
                        msg.isOwn
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={`mt-1 text-xs ${
                          msg.isOwn ? "text-blue-100" : "text-gray-500"
                        }`}
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
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                {/* Input Field */}
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Write a message..."
                  className="flex-1 rounded-full bg-gray-100 px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
