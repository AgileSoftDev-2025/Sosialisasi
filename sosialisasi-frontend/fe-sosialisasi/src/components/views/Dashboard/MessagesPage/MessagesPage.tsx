import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";
import useMessage from "@/components/hooks/useMessage";

const MessagesPage = () => {
  const {
    conversations,
    messages,
    selectedUser,
    handleSelectUser,
    sendMessage,
  } = useMessage();

  const [messageInput, setMessageInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedUser) return;

    sendMessage({
      receiverId: selectedUser._id,
      text: messageInput,
    });

    setMessageInput("");
  };

  const handleSelectConversation = (user: any) => {
    handleSelectUser(user);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const handleBackToList = () => setShowSidebar(true);

  return (
    <DashboardLayout>
      <div className="flex h-[100dvh] bg-white md:h-[calc(100vh-100px)] md:rounded-3xl md:shadow-sm">
        <div className="flex h-full w-full overflow-hidden">
          <div
            className={`${
              showSidebar ? "flex" : "hidden"
            } h-full w-full flex-col border-r border-gray-200 md:flex md:w-80 lg:w-96 xl:w-[400px]`}
          >
            <div className="border-b border-gray-200 p-4 md:p-6">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Messages
              </h1>

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

            <div className="flex-1 overflow-y-auto">
              {conversations.map((u) => (
                <div
                  key={u._id}
                  onClick={() => handleSelectConversation(u)}
                  className={`cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 ${
                    selectedUser?._id === u._id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={u.profilePicture || "/default.png"}
                      alt={u.fullName}
                      className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                    />

                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-start justify-between">
                        <h3 className="truncate text-sm font-semibold text-gray-900">
                          {u.fullName}
                        </h3>
                        <span className="ml-2 flex-shrink-0 text-xs text-gray-500">
                          now
                        </span>
                      </div>

                      <p className="truncate text-xs text-gray-500">
                        {u.role ?? "User"}
                      </p>

                      <p className="mt-1 truncate text-sm text-gray-600">
                        (last message)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${
              !showSidebar ? "flex" : "hidden"
            } h-full w-full flex-1 flex-col md:flex`}
          >
            {selectedUser && (
              <div className="flex items-center gap-3 border-b border-gray-200 p-4 md:p-6">
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
                  src={selectedUser.profilePicture || "/default.png"}
                  alt={selectedUser.fullName}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div className="flex-1 overflow-hidden">
                  <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                    {selectedUser.fullName}
                  </h2>
                  <p className="truncate text-xs text-gray-500 sm:text-sm">
                    {selectedUser.role ?? "User"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.senderId === selectedUser?._id
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] md:max-w-[70%] ${
                        msg.senderId === selectedUser?._id
                          ? "bg-white text-gray-900"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>

                      <p
                        className={`mt-1 text-xs ${
                          msg.senderId === selectedUser?._id
                            ? "text-gray-500"
                            : "text-blue-100"
                        }`}
                      >
                        {new Date(msg.created_at_message).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
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

                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Write a message..."
                  className="flex-1 rounded-full bg-gray-100 px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />

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
