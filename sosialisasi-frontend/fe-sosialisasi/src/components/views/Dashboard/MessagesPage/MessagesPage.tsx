import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState, useEffect, useRef } from "react";
import useMessage from "@/components/hooks/useMessage";
import Image from "next/image";
import environment from "@/config/environment";

const formatDateLabel = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000);

  const sameDate = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  if (sameDate(date, today)) return "Hari ini";
  if (sameDate(date, yesterday)) return "Kemarin";

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
};

const groupMessagesByDate = (messages: any[]) => {
  const groups: Record<string, any[]> = {};

  messages.forEach((msg) => {
    const key = new Date(msg.created_at_message)
      .toISOString()
      .split("T")[0];

    if (!groups[key]) groups[key] = [];
    groups[key].push(msg);
  });

  return groups;
};



const MessagesPage = () => {
  const {
    conversations,
    messages,
    selectedUser,
    handleSelectUser,
    sendMessage,
    onlineUsers,
  } = useMessage();

  




  const [messageInput, setMessageInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  // REF HARUS DI DALAM KOMPONEN
  const scrollRef = useRef<HTMLDivElement>(null);

  // AUTO SCROLL KETIKA ADA PESAN BARU
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);

  

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
      <div className="flex h-[100dvh] w-screen bg-white md:h-[calc(100vh-100px)] border-l-2 border-gray-300 md:shadow-sm">
        <div className="flex h-full w-full overflow-hidden">

          {/* SIDEBAR */}
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

            {/* LIST USER */}
            <div className="flex-1 overflow-y-auto">
  {conversations.length === 0 ? (
    <div className="flex h-full items-center justify-center p-6 text-center text-gray-500">
      <p className="text-sm">Anda Belum Melakukan Koneksi Dengan Siapapun</p>
    </div>
  ) : (
    conversations.map((u) => {
      const isOnline = onlineUsers.includes(u._id);

      return (
        <div
          key={u._id}
          onClick={() => handleSelectConversation(u)}
          className={`cursor-pointer border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 ${
            selectedUser?._id === u._id ? "bg-blue-50" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src={
                  u.profilePicture
                    ? `${environment.CONSTANT_URL}${u.profilePicture}`
                    : "/default.png"
                }
                alt={u.fullName}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="truncate text-sm font-semibold text-gray-900">
                  {u.fullName}
                </h3>

                <div className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <p className="text-xs text-gray-500">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <p className="truncate text-xs text-gray-500">
                {u.role ?? "User"}
              </p>
            </div>
          </div>
        </div>
      );
    })
  )}
</div>

          </div>

          {/* PANEL CHAT */}
          <div
            className={`${
              !showSidebar ? "flex" : "hidden"
            } h-full w-full flex-1 flex-col md:flex`}
          >
            {/* Header */}
            {selectedUser && (
              <div className="flex items-center gap-3 border-b border-gray-200 p-4 md:p-6">
                <button
                  onClick={handleBackToList}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 md:hidden"
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

                <div className="relative h-12 w-12">
                  <Image
                    src={
                      selectedUser.profilePicture
                        ? `${environment.CONSTANT_URL}${selectedUser.profilePicture}`
                        : "/default.png"
                    }
                    alt={selectedUser.fullName}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

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

            {/* AREA CHAT */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6"
            >
              {selectedUser ? (
                <div className="space-y-8">
  {Object.entries(groupMessagesByDate(messages)).map(
    ([dateKey, msgs]) => (
      <div key={dateKey}>
        
        {/* LABEL TANGGAL */}
        <div className="flex justify-center my-2">
          <span className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded-full">
            {formatDateLabel(msgs[0].created_at_message)}
          </span>
        </div>

        {/* LIST PESAN DI TANGGAL INI */}
        <div className="space-y-4">
          {msgs.map((msg) => {
            const isOwn = msg.senderId !== selectedUser?._id;

            return (
              <div
                key={msg._id}
                className={`flex ${
                  isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] md:max-w-[70%] ${
                    isOwn
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>

                  <p
                    className={`mt-1 text-xs ${
                      isOwn ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {new Date(
                      msg.created_at_message
                    ).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  )}
</div>

              ) : (
                // WELCOME PAGE
                <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-20 h-20 opacity-50 mb-6"
                  >
                    <path d="M12.292 3.293a1 1 0 011.416 0l7.999 8a1 1 0 010 1.414l-4.5 4.5a3 3 0 01-4.242 0l-.46-.46-1.88 1.88a3 3 0 01-4.242 0L2.293 14.5a1 1 0 010-1.414l8-7.999z" />
                  </svg>

                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Selamat datang di Pesan Sosialisasi
                  </h2>
                  <p className="max-w-sm text-sm text-gray-500">
                    Pilih salah satu pengguna di panel kiri untuk mulai melakukan percakapan.
                  </p>
                </div>
              )}
            </div>

            {/* INPUT */}
            {selectedUser && (
              <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100">
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
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
