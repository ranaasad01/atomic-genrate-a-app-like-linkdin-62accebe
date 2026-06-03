"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Home, Users, Briefcase, MessageSquare, Bell, Search, ChevronDown, Menu, X, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "/network", label: "My Network", icon: Users },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/messaging", label: "Messaging", icon: MessageSquare },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push("/search?q=" + encodeURIComponent(searchQuery));
    }
  }

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function handleAvatarError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    img.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=0A66C2&color=fff";
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center h-14 gap-2">
        <Link href="/feed" className="flex-shrink-0 mr-2">
          <div className="w-9 h-9 bg-[#0A66C2] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">PC</span>
          </div>
        </Link>

        <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-[#EEF3F8] rounded-md px-3 py-1.5 gap-2 w-56">
          <Search size={16} className="text-gray-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-500"
          />
        </form>

        <div className="hidden md:flex items-center ml-auto gap-1">
          {NAV_ITEMS.map(function(item) {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={"flex flex-col items-center px-3 py-1 rounded text-xs font-medium transition-colors min-w-[56px] " + (active ? "text-[#0A66C2] border-b-2 border-[#0A66C2]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100")}
              >
                <Icon size={20} />
                <span className="mt-0.5">{item.label}</span>
              </Link>
            );
          })}

          <div className="w-px h-10 bg-gray-200 mx-2" />

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex flex-col items-center px-2 py-1 rounded text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <img
                src={user?.avatar || "https://m.media-amazon.com/images/M/MV5BMTVlYmRhMWQtNmE0Yi00ODM1LWEzMWEtNTQzZGZhODRmZTE0XkEyXkFqcGc@._V1_.jpg"}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover"
                onError={handleAvatarError}
              />
              <span className="flex items-center gap-0.5 mt-0.5">
                Me <ChevronDown size={12} />
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.avatar || "https://m.media-amazon.com/images/M/MV5BMTVlYmRhMWQtNmE0Yi00ODM1LWEzMWEtNTQzZGZhODRmZTE0XkEyXkFqcGc@._V1_.jpg"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                      onError={handleAvatarError}
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{user?.name || "Alex Johnson"}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{user?.headline || "Senior Software Engineer"}</p>
                    </div>
                  </div>
                  <Link
                    href="/profile/1"
                    onClick={() => setShowDropdown(false)}
                    className="mt-3 block text-center text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full py-1 hover:bg-blue-50 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
                <div className="py-2">
                  <Link href="/settings" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings size={16} /> Settings
                  </Link>
                  <Link href="/profile/1" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={16} /> Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="md:hidden ml-auto p-2 text-gray-500" onClick={() => setShowMobile(!showMobile)}>
          {showMobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {showMobile && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-1">
          <form onSubmit={handleSearch} className="flex items-center bg-[#EEF3F8] rounded-md px-3 py-2 gap-2 mb-3">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full"
            />
          </form>
          {NAV_ITEMS.map(function(item) {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowMobile(false)}
                className={"flex items-center gap-3 px-3 py-2 rounded text-sm font-medium " + (pathname === item.href ? "text-[#0A66C2] bg-blue-50" : "text-gray-700 hover:bg-gray-50")}
              >
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
