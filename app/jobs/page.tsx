"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Search, MapPin, Briefcase, Clock, Users, Bookmark, BookmarkCheck, Filter, X } from 'lucide-react';
import { JOBS } from "@/lib/mock-data";

export default function JobsPage() {
  const [searchQ, setSearchQ] = useState("");
  const [locationQ, setLocationQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>(JOBS.filter((j) => j.saved).map((j) => j.id));
  const [showFilters, setShowFilters] = useState(false);

  const types = ["All", "Full-time", "Part-time", "Contract", "Internship"];
  const levels = ["All", "Entry", "Mid", "Senior", "Director"];

  const filtered = JOBS.filter((job) => {
    const matchSearch = !searchQ || job.title.toLowerCase().includes(searchQ.toLowerCase()) || job.company.toLowerCase().includes(searchQ.toLowerCase());
    const matchLocation = !locationQ || job.location.toLowerCase().includes(locationQ.toLowerCase());
    const matchType = typeFilter === "All" || job.type === typeFilter;
    const matchLevel = levelFilter === "All" || job.level === levelFilter;
    const matchRemote = !remoteOnly || job.remote;
    return matchSearch && matchLocation && matchType && matchLevel && matchRemote;
  });

  function toggleSave(id: string) {
    setSaved((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  }

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Find your next opportunity</h1>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 flex-1 border border-gray-300 rounded-lg px-3 py-2.5">
                <Search size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  className="flex-1 text-sm outline-none"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 border border-gray-300 rounded-lg px-3 py-2.5">
                <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={locationQ}
                  onChange={(e) => setLocationQ(e.target.value)}
                  className="flex-1 text-sm outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white text-sm font-semibold rounded-lg hover:bg-[#004182] transition-colors">
                <Search size={16} /> Search
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} /> Filters
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Job Type</label>
                  <div className="flex flex-wrap gap-2">
                    {types.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTypeFilter(t)}
                        className={"px-3 py-1 rounded-full text-xs font-medium border transition-colors " + (typeFilter === t ? "bg-[#0A66C2] text-white border-[#0A66C2]" : "border-gray-300 text-gray-600 hover:border-[#0A66C2] hover:text-[#0A66C2]")}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Experience Level</label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLevelFilter(l)}
                        className={"px-3 py-1 rounded-full text-xs font-medium border transition-colors " + (levelFilter === l ? "bg-[#0A66C2] text-white border-[#0A66C2]" : "border-gray-300 text-gray-600 hover:border-[#0A66C2] hover:text-[#0A66C2]")}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remote"
                    checked={remoteOnly}
                    onChange={(e) => setRemoteOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#0A66C2]"
                  />
                  <label htmlFor="remote" className="text-sm text-gray-700 font-medium">Remote only</label>
                </div>
                <button
                  onClick={() => { setTypeFilter("All"); setLevelFilter("All"); setRemoteOnly(false); setSearchQ(""); setLocationQ(""); }}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={12} /> Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600">{filtered.length} jobs found</p>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:border-[#0A66C2]">
            <option>Most relevant</option>
            <option>Most recent</option>
            <option>Salary: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((job) => (
            <div key={job.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded object-cover border border-gray-200"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(job.company) + "&background=EEF3F8&color=0A66C2&size=48";
                    }}
                  />
                  <div>
                    <Link href={"/jobs/" + job.id} className="font-semibold text-sm text-gray-900 hover:text-[#0A66C2] group-hover:text-[#0A66C2] transition-colors">
                      {job.title}
                    </Link>
                    <Link href={"/company/" + job.companyId} className="block text-sm text-gray-600 hover:underline">
                      {job.company}
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => toggleSave(job.id)}
                  className={"p-1.5 rounded hover:bg-gray-100 transition-colors " + (saved.includes(job.id) ? "text-[#0A66C2]" : "text-gray-400")}
                >
                  {saved.includes(job.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {job.posted}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {job.applicants} applicants</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-50 text-[#0A66C2] font-medium px-2 py-0.5 rounded-full">{job.level}</span>
                  {job.remote && <span className="text-xs bg-green-50 text-green-700 font-medium px-2 py-0.5 rounded-full">Remote</span>}
                  <span className="text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">{job.salary}</span>
                </div>
                <Link
                  href={"/jobs/" + job.id}
                  className="text-xs font-semibold text-[#0A66C2] hover:underline"
                >
                  View job →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
