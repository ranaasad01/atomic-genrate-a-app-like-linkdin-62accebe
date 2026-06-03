"use client";
import { useState } from "react";
import Link from "next/link";
import { UserPlus, X } from 'lucide-react';
import { SUGGESTIONS } from "@/lib/mock-data";

export default function RightSidebar() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [connected, setConnected] = useState<string[]>([]);

  const visible = SUGGESTIONS.filter((s) => !dismissed.includes(s.id));

  return (
    <aside className="w-full space-y-3">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">People you may know</h3>
        </div>
        <div className="space-y-4">
          {visible.slice(0, 3).map((person) => (
            <div key={person.id} className="flex items-start gap-3">
              <Link href={"/profile/" + person.id}>
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(person.name) + "&background=0A66C2&color=fff";
                  }}
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={"/profile/" + person.id} className="text-sm font-semibold text-gray-900 hover:underline block truncate">
                  {person.name}
                </Link>
                <p className="text-xs text-gray-500 truncate">{person.headline}</p>
                <p className="text-xs text-gray-400 mt-0.5">{person.reason}</p>
                {connected.includes(person.id) ? (
                  <span className="mt-1.5 inline-block text-xs text-gray-500 font-medium">Pending</span>
                ) : (
                  <button
                    onClick={() => setConnected((c) => [...c, person.id])}
                    className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-3 py-0.5 hover:bg-blue-50 transition-colors"
                  >
                    <UserPlus size={12} /> Connect
                  </button>
                )}
              </div>
              <button
                onClick={() => setDismissed((d) => [...d, person.id])}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <Link href="/network" className="block mt-4 text-center text-sm font-semibold text-gray-600 hover:text-[#0A66C2] hover:bg-gray-50 py-2 rounded transition-colors">
          View all recommendations →
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">ProConnect News</h3>
        <ul className="space-y-3">
          {[
            { title: "Tech layoffs slow as AI hiring surges", time: "2h ago", readers: "12,847 readers" },
            { title: "Remote work policies shifting in 2025", time: "4h ago", readers: "8,203 readers" },
            { title: "Top skills employers want this year", time: "6h ago", readers: "21,456 readers" },
            { title: "How to negotiate your salary in 2025", time: "1d ago", readers: "34,891 readers" },
          ].map((item) => (
            <li key={item.title} className="cursor-pointer group">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-[#0A66C2] transition-colors leading-tight">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.time} · {item.readers}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
