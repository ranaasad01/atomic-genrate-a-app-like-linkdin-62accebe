"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ThumbsUp, MessageCircle, UserPlus, Briefcase, Award, Bell, CheckCheck } from 'lucide-react';
import { NOTIFICATIONS } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  like: <ThumbsUp size={16} className="text-blue-500" />,
  comment: <MessageCircle size={16} className="text-green-500" />,
  connection: <UserPlus size={16} className="text-[#0A66C2]" />,
  job: <Briefcase size={16} className="text-orange-500" />,
  endorsement: <Award size={16} className="text-purple-500" />,
};

const bgMap: Record<string, string> = {
  like: "bg-blue-100",
  comment: "bg-green-100",
  connection: "bg-blue-100",
  job: "bg-orange-100",
  endorsement: "bg-purple-100",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((n) => n.map((item) => ({ ...item, read: true })));
  }

  function markRead(id: string) {
    setNotifications((n) => n.map((item) => item.id === id ? { ...item, read: true } : item));
  }

  const filters = ["All", "Unread", "Jobs", "Connections"];
  const filtered = notifications.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Jobs") return n.type === "job";
    if (filter === "Connections") return n.type === "connection";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 pt-20 pb-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-gray-700" />
              <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-[#0A66C2] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] hover:underline"
              >
                <CheckCheck size={14} /> Mark all as read
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="px-5 py-3 border-b border-gray-100 flex gap-2 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={"px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap " + (filter === f ? "bg-[#0A66C2] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="divide-y divide-gray-50">
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Bell size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No notifications to show</p>
              </div>
            )}
            {filtered.map((notif) => (
              <Link
                key={notif.id}
                href={notif.link}
                onClick={() => markRead(notif.id)}
                className={"flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors " + (!notif.read ? "bg-blue-50/40" : "")}
              >
                <div className="relative flex-shrink-0">
                  {notif.actor ? (
                    <img
                      src={notif.actor.avatar}
                      alt={notif.actor.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(notif.actor!.name) + "&background=0A66C2&color=fff";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <Briefcase size={20} className="text-orange-500" />
                    </div>
                  )}
                  <div className={"absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center " + (bgMap[notif.type] || "bg-gray-100")}>
                    {iconMap[notif.type]}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-snug">
                    {notif.actor && (
                      <span className="font-semibold">{notif.actor.name} </span>
                    )}
                    {notif.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>

                  {notif.type === "connection" && !notif.read && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={(e) => { e.preventDefault(); markRead(notif.id); }}
                        className="px-4 py-1.5 bg-[#0A66C2] text-white text-xs font-semibold rounded-full hover:bg-[#004182] transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => { e.preventDefault(); markRead(notif.id); }}
                        className="px-4 py-1.5 border border-gray-300 text-gray-600 text-xs font-semibold rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>

                {!notif.read && (
                  <div className="w-2.5 h-2.5 bg-[#0A66C2] rounded-full flex-shrink-0 mt-1.5" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
