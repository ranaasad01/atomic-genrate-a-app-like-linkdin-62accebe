"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Send, Search, MoreHorizontal, Phone, Video, Info } from 'lucide-react';
import { CONVERSATIONS } from "@/lib/mock-data";

export default function MessagingPage() {
  const [activeConv, setActiveConv] = useState(CONVERSATIONS[0]);
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [message, setMessage] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv]);

  function sendMessage() {
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      senderId: "1",
      text: message,
      time: "Just now",
    };
    const updated = conversations.map((c) => {
      if (c.id === activeConv.id) {
        const updatedConv = {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: message,
          time: "Just now",
        };
        setActiveConv(updatedConv);
        return updatedConv;
      }
      return c;
    });
    setConversations(updated);
    setMessage("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const filtered = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-4">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden" style={{ height: "calc(100vh - 100px)" }}>
          <div className="flex h-full">
            {/* Conversation List */}
            <div className="w-80 border-r border-gray-200 flex flex-col flex-shrink-0">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Messaging</h2>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                  <Search size={14} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages"
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    className="bg-transparent text-sm outline-none flex-1"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filtered.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConv(conv)}
                    className={"w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left " + (activeConv.id === conv.id ? "bg-blue-50 border-l-2 border-l-[#0A66C2]" : "")}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={conv.user.avatar}
                        alt={conv.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(conv.user.name) + "&background=0A66C2&color=fff";
                        }}
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-gray-900 truncate">{conv.user.name}</span>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 bg-[#0A66C2] text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Link href={"/profile/" + activeConv.user.id}>
                    <img
                      src={activeConv.user.avatar}
                      alt={activeConv.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(activeConv.user.name) + "&background=0A66C2&color=fff";
                      }}
                    />
                  </Link>
                  <div>
                    <Link href={"/profile/" + activeConv.user.id} className="font-semibold text-sm text-gray-900 hover:underline">
                      {activeConv.user.name}
                    </Link>
                    <p className="text-xs text-gray-500">{activeConv.user.headline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Video size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <Info size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {activeConv.messages.map((msg) => {
                  const isMe = msg.senderId === "1";
                  return (
                    <div key={msg.id} className={"flex items-end gap-2 " + (isMe ? "flex-row-reverse" : "")}>
                      {!isMe && (
                        <img
                          src={activeConv.user.avatar}
                          alt={activeConv.user.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(activeConv.user.name) + "&background=0A66C2&color=fff";
                          }}
                        />
                      )}
                      <div className={"max-w-xs lg:max-w-md " + (isMe ? "items-end" : "items-start") + " flex flex-col"}>
                        <div className={"px-4 py-2.5 rounded-2xl text-sm " + (isMe ? "bg-[#0A66C2] text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm")}>
                          {msg.text}
                        </div>
                        <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="px-5 py-4 border-t border-gray-200">
                <div className="flex items-center gap-3 bg-gray-50 rounded-full border border-gray-200 px-4 py-2">
                  <input
                    type="text"
                    placeholder={"Write a message to " + activeConv.user.name.split(" ")[0] + "..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="w-8 h-8 bg-[#0A66C2] text-white rounded-full flex items-center justify-center hover:bg-[#004182] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
