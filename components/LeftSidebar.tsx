"use client";
import Link from "next/link";
import { MapPin, Users, Eye, Bookmark } from 'lucide-react';
import { CURRENT_USER } from "@/lib/mock-data";

export default function LeftSidebar() {
  return (
    <aside className="w-full space-y-3">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-[#0A66C2] to-[#004182]" />
        <div className="px-4 pb-4">
          <div className="-mt-8 mb-2">
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-16 h-16 rounded-full border-2 border-white object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Alex+Johnson&background=0A66C2&color=fff";
              }}
            />
          </div>
          <Link href="/profile/1" className="font-semibold text-sm text-gray-900 hover:underline block">
            {CURRENT_USER.name}
          </Link>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{CURRENT_USER.headline}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <MapPin size={12} />
            <span>{CURRENT_USER.location}</span>
          </div>
        </div>
        <div className="border-t border-gray-100 px-4 py-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 flex items-center gap-1"><Eye size={12} /> Profile views</span>
            <span className="font-semibold text-[#0A66C2]">248</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 flex items-center gap-1"><Users size={12} /> Connections</span>
            <span className="font-semibold text-[#0A66C2]">{CURRENT_USER.connections}</span>
          </div>
        </div>
        <div className="border-t border-gray-100 px-4 py-3">
          <Link href="/jobs" className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#0A66C2] font-medium">
            <Bookmark size={14} /> Saved jobs
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent</h3>
        <ul className="space-y-2">
          {["#reactjs", "#typescript", "#webdev", "#systemdesign", "#career"].map((tag) => (
            <li key={tag}>
              <Link href={"/search?q=" + tag} className="text-sm text-gray-700 hover:text-[#0A66C2] hover:underline">
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
