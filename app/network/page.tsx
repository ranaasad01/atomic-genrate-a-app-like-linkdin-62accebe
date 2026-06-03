"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { UserPlus, UserCheck, X, Users, Search } from 'lucide-react';
import { USERS, CONNECTION_REQUESTS, SUGGESTIONS } from "@/lib/mock-data";

export default function NetworkPage() {
  const [requests, setRequests] = useState(CONNECTION_REQUESTS);
  const [connected, setConnected] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [searchQ, setSearchQ] = useState("");

  function acceptRequest(id: string) {
    setRequests((r) => r.filter((req) => req.id !== id));
  }

  function ignoreRequest(id: string) {
    setRequests((r) => r.filter((req) => req.id !== id));
  }

  function connect(userId: string) {
    setConnected((c) => [...c, userId]);
  }

  function dismiss(userId: string) {
    setDismissed((d) => [...d, userId]);
  }

  const connections = USERS.slice(1, 5);
  const suggestions = SUGGESTIONS.filter((s) => !dismissed.includes(s.id));
  const filteredConnections = connections.filter((u) =>
    u.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    u.headline.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-8 space-y-5">
        <h1 className="text-xl font-bold text-gray-900">My Network</h1>

        {/* Pending Requests */}
        {requests.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Pending invitations <span className="text-[#0A66C2] ml-1">{requests.length}</span>
            </h2>
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <Link href={"/profile/" + req.user.id}>
                    <img
                      src={req.user.avatar}
                      alt={req.user.name}
                      className="w-14 h-14 rounded-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(req.user.name) + "&background=0A66C2&color=fff";
                      }}
                    />
                  </Link>
                  <div className="flex-1">
                    <Link href={"/profile/" + req.user.id} className="font-semibold text-sm text-gray-900 hover:underline">
                      {req.user.name}
                    </Link>
                    <p className="text-xs text-gray-500">{req.user.headline}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{req.time}</p>
                    {req.message && (
                      <p className="text-xs text-gray-600 mt-1 italic">&ldquo;{req.message}&rdquo;</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0A66C2] text-white text-sm font-semibold rounded-full hover:bg-[#004182] transition-colors"
                      >
                        <UserCheck size={14} /> Accept
                      </button>
                      <button
                        onClick={() => ignoreRequest(req.id)}
                        className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-300 text-gray-600 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors"
                      >
                        <X size={14} /> Ignore
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Connections */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Users size={18} className="text-[#0A66C2]" />
              My Connections <span className="text-gray-400 font-normal text-sm">({connections.length})</span>
            </h2>
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search connections"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="bg-transparent text-sm outline-none w-36"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredConnections.map((user) => (
              <div key={user.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm transition-all">
                <Link href={"/profile/" + user.id}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name) + "&background=0A66C2&color=fff";
                    }}
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={"/profile/" + user.id} className="font-semibold text-sm text-gray-900 hover:underline block truncate">
                    {user.name}
                  </Link>
                  <p className="text-xs text-gray-500 truncate">{user.headline}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{user.location}</p>
                  <Link
                    href={"/messaging"}
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#0A66C2] hover:underline"
                  >
                    Message
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* People You May Know */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">People you may know</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((person) => (
              <div key={person.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-16 bg-gradient-to-r from-[#EEF3F8] to-[#dce8f5]" />
                <div className="px-4 pb-4">
                  <div className="-mt-8 mb-2">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-14 h-14 rounded-full border-2 border-white object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(person.name) + "&background=0A66C2&color=fff";
                      }}
                    />
                  </div>
                  <Link href={"/profile/" + person.id} className="font-semibold text-sm text-gray-900 hover:underline block">
                    {person.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{person.headline}</p>
                  <p className="text-xs text-gray-400 mt-1">{person.reason}</p>
                  <div className="flex gap-2 mt-3">
                    {connected.includes(person.id) ? (
                      <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <UserCheck size={12} className="text-green-500" /> Pending
                      </span>
                    ) : (
                      <button
                        onClick={() => connect(person.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
                      >
                        <UserPlus size={12} /> Connect
                      </button>
                    )}
                    <button
                      onClick={() => dismiss(person.id)}
                      className="text-xs text-gray-400 hover:text-gray-600 px-2"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
