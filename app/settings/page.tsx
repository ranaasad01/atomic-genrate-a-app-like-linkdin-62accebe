"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { User, Lock, Bell, Eye, Globe, Trash2, Shield, Moon, Sun, CheckCircle } from 'lucide-react';

const SECTIONS = [
  { id: "account", label: "Account preferences", icon: User },
  { id: "privacy", label: "Privacy & visibility", icon: Eye },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Sun },
  { id: "data", label: "Data privacy", icon: Shield },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [saved, setSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifSettings, setNotifSettings] = useState({
    emailDigest: true,
    connectionRequests: true,
    jobAlerts: true,
    postLikes: false,
    comments: true,
    messages: true,
    profileViews: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "Public",
    connectionVisibility: "Connections",
    activityStatus: true,
    searchAppearance: true,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function toggleNotif(key: string) {
    setNotifSettings((s) => ({ ...s, [key]: !s[key as keyof typeof s] }));
  }

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-8">
        <h1 className="text-xl font-bold text-gray-900 mb-5">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-5">
          {/* Settings Nav */}
          <aside className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 h-fit">
            <nav className="space-y-1">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={"w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors " + (activeSection === s.id ? "bg-blue-50 text-[#0A66C2]" : "text-gray-700 hover:bg-gray-50")}
                  >
                    <Icon size={16} />
                    {s.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Settings Content */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            {activeSection === "account" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Account preferences</h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Profile information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Name</label>
                        <input type="text" defaultValue="Alex Johnson" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
                        <input type="email" defaultValue="alex.johnson@email.com" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone</label>
                        <input type="tel" defaultValue="+1 (415) 555-0192" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Language & region</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Language</label>
                        <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2]">
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Japanese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Time zone</label>
                        <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2]">
                          <option>Pacific Time (PT)</option>
                          <option>Eastern Time (ET)</option>
                          <option>Central European Time (CET)</option>
                          <option>Japan Standard Time (JST)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-red-600 mb-3">Danger zone</h3>
                    <button className="flex items-center gap-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg px-4 py-2.5 hover:bg-red-50 transition-colors">
                      <Trash2 size={14} /> Close account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "privacy" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Privacy & visibility</h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Profile visibility</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Who can see your profile</label>
                        <select
                          value={privacySettings.profileVisibility}
                          onChange={(e) => setPrivacySettings((s) => ({ ...s, profileVisibility: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2]"
                        >
                          <option>Public</option>
                          <option>Connections only</option>
                          <option>Private</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Who can see your connections</label>
                        <select
                          value={privacySettings.connectionVisibility}
                          onChange={(e) => setPrivacySettings((s) => ({ ...s, connectionVisibility: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2]"
                        >
                          <option>Connections</option>
                          <option>Everyone</option>
                          <option>Only me</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Activity</h3>
                    <div className="space-y-3">
                      {[
                        { key: "activityStatus", label: "Show activity status", desc: "Let your connections see when you're active" },
                        { key: "searchAppearance", label: "Appear in search results", desc: "Allow your profile to appear in ProConnect search" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{item.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setPrivacySettings((s) => ({ ...s, [item.key]: !s[item.key as keyof typeof s] }))}
                            className={"relative w-11 h-6 rounded-full transition-colors flex-shrink-0 " + (privacySettings[item.key as keyof typeof privacySettings] ? "bg-[#0A66C2]" : "bg-gray-300")}
                          >
                            <span className={"absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform " + (privacySettings[item.key as keyof typeof privacySettings] ? "translate-x-5" : "translate-x-0.5")} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Notification preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: "emailDigest", label: "Weekly email digest", desc: "Get a weekly summary of your network activity" },
                    { key: "connectionRequests", label: "Connection requests", desc: "When someone sends you a connection request" },
                    { key: "jobAlerts", label: "Job alerts", desc: "New jobs matching your profile and preferences" },
                    { key: "postLikes", label: "Post likes", desc: "When someone likes your posts or comments" },
                    { key: "comments", label: "Comments", desc: "When someone comments on your posts" },
                    { key: "messages", label: "New messages", desc: "When you receive a new message" },
                    { key: "profileViews", label: "Profile views", desc: "When someone views your profile" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotif(item.key)}
                        className={"relative w-11 h-6 rounded-full transition-colors flex-shrink-0 " + (notifSettings[item.key as keyof typeof notifSettings] ? "bg-[#0A66C2]" : "bg-gray-300")}
                      >
                        <span className={"absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform " + (notifSettings[item.key as keyof typeof notifSettings] ? "translate-x-5" : "translate-x-0.5")} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Security</h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Password</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Current password</label>
                        <input type="password" placeholder="Enter current password" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">New password</label>
                        <input type="password" placeholder="Enter new password" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Confirm new password</label>
                        <input type="password" placeholder="Confirm new password" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2]" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Two-factor authentication</h3>
                    <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-800">Enable 2FA</p>
                        <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
                      </div>
                      <button className="text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-4 py-1.5 hover:bg-blue-50 transition-colors flex-shrink-0">
                        Set up
                      </button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Active sessions</h3>
                    <div className="space-y-3">
                      {[
                        { device: "MacBook Pro — Chrome", location: "San Francisco, CA", time: "Current session", current: true },
                        { device: "iPhone 15 — Safari", location: "San Francisco, CA", time: "2 hours ago", current: false },
                      ].map((session) => (
                        <div key={session.device} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{session.device}</p>
                            <p className="text-xs text-gray-500">{session.location} · {session.time}</p>
                          </div>
                          {session.current ? (
                            <span className="text-xs text-green-600 font-semibold flex items-center gap-1"><CheckCircle size={12} /> Active</span>
                          ) : (
                            <button className="text-xs text-red-500 font-semibold hover:underline">Sign out</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Appearance</h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Theme</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setDarkMode(false)}
                        className={"flex items-center gap-3 p-4 border-2 rounded-lg transition-colors " + (!darkMode ? "border-[#0A66C2] bg-blue-50" : "border-gray-200 hover:border-gray-300")}
                      >
                        <Sun size={20} className={!darkMode ? "text-[#0A66C2]" : "text-gray-400"} />
                        <div className="text-left">
                          <p className={"text-sm font-semibold " + (!darkMode ? "text-[#0A66C2]" : "text-gray-700")}>Light</p>
                          <p className="text-xs text-gray-500">Default theme</p>
                        </div>
                        {!darkMode && <CheckCircle size={16} className="text-[#0A66C2] ml-auto" />}
                      </button>
                      <button
                        onClick={() => setDarkMode(true)}
                        className={"flex items-center gap-3 p-4 border-2 rounded-lg transition-colors " + (darkMode ? "border-[#0A66C2] bg-blue-50" : "border-gray-200 hover:border-gray-300")}
                      >
                        <Moon size={20} className={darkMode ? "text-[#0A66C2]" : "text-gray-400"} />
                        <div className="text-left">
                          <p className={"text-sm font-semibold " + (darkMode ? "text-[#0A66C2]" : "text-gray-700")}>Dark</p>
                          <p className="text-xs text-gray-500">Easy on the eyes</p>
                        </div>
                        {darkMode && <CheckCircle size={16} className="text-[#0A66C2] ml-auto" />}
                      </button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Font size</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">A</span>
                      <input type="range" min="12" max="20" defaultValue="14" className="flex-1 accent-[#0A66C2]" />
                      <span className="text-lg text-gray-500">A</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Feed density</h3>
                    <div className="space-y-2">
                      {["Comfortable", "Compact"].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="density" defaultChecked={option === "Comfortable"} className="accent-[#0A66C2]" />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "data" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Data privacy</h2>
                <div className="space-y-5">
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm text-[#0A66C2] font-semibold mb-1">Your data, your control</p>
                    <p className="text-xs text-gray-600">ProConnect is committed to protecting your privacy. You can download, manage, or delete your data at any time.</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: "Download your data", desc: "Get a copy of all your ProConnect data including posts, connections, and messages", action: "Request download" },
                      { title: "Manage ad preferences", desc: "Control how ProConnect uses your data for advertising", action: "Manage" },
                      { title: "Delete account data", desc: "Permanently delete all your data from ProConnect servers", action: "Delete data" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start justify-between gap-4 p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                        <button className="text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-4 py-1.5 hover:bg-blue-50 transition-colors flex-shrink-0 whitespace-nowrap">
                          {item.action}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
              <button className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={"flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors " + (saved ? "bg-green-500 text-white" : "bg-[#0A66C2] text-white hover:bg-[#004182]")}
              >
                {saved ? <><CheckCircle size={14} /> Saved!</> : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
