"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { UserPlus, Briefcase, Building, MapPin, Users, Search } from 'lucide-react';
import { USERS, JOBS, COMPANIES } from "@/lib/mock-data";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("People");
  const [connected, setConnected] = useState<string[]>([]);

  const tabs = ["People", "Jobs", "Companies"];

  const filteredPeople = USERS.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.headline.toLowerCase().includes(query.toLowerCase()) ||
    u.company.toLowerCase().includes(query.toLowerCase())
  );

  const filteredJobs = JOBS.filter((j) =>
    j.title.toLowerCase().includes(query.toLowerCase()) ||
    j.company.toLowerCase().includes(query.toLowerCase()) ||
    j.location.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCompanies = COMPANIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.industry.toLowerCase().includes(query.toLowerCase())
  );

  const counts: Record<string, number> = {
    People: filteredPeople.length,
    Jobs: filteredJobs.length,
    Companies: filteredCompanies.length,
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Search results for &ldquo;<span className="text-[#0A66C2]">{query}</span>&rdquo;
          </h1>
          <p className="text-sm text-gray-500">
            {filteredPeople.length + filteredJobs.length + filteredCompanies.length} results found
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={"flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 " + (activeTab === tab ? "border-[#0A66C2] text-[#0A66C2]" : "border-transparent text-gray-500 hover:text-gray-900")}
              >
                {tab}
                <span className={"text-xs px-1.5 py-0.5 rounded-full font-semibold " + (activeTab === tab ? "bg-blue-100 text-[#0A66C2]" : "bg-gray-100 text-gray-500")}>
                  {counts[tab]}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4">
            {activeTab === "People" && (
              <div className="space-y-4">
                {filteredPeople.length === 0 && (
                  <div className="py-10 text-center text-gray-500 text-sm">No people found for &ldquo;{query}&rdquo;</div>
                )}
                {filteredPeople.map((person) => (
                  <div key={person.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <Link href={"/profile/" + person.id}>
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-14 h-14 rounded-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(person.name) + "&background=0A66C2&color=fff";
                        }}
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href={"/profile/" + person.id} className="font-semibold text-sm text-gray-900 hover:underline">
                        {person.name}
                      </Link>
                      <p className="text-sm text-gray-600">{person.headline}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {person.location}</span>
                        <span className="flex items-center gap-1"><Users size={11} /> {person.connections} connections</span>
                        {person.mutual > 0 && <span>{person.mutual} mutual</span>}
                      </div>
                    </div>
                    {connected.includes(person.id) ? (
                      <span className="text-xs text-gray-500 font-medium mt-1">Pending</span>
                    ) : (
                      <button
                        onClick={() => setConnected((c) => [...c, person.id])}
                        className="flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-4 py-1.5 hover:bg-blue-50 transition-colors flex-shrink-0"
                      >
                        <UserPlus size={14} /> Connect
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Jobs" && (
              <div className="space-y-4">
                {filteredJobs.length === 0 && (
                  <div className="py-10 text-center text-gray-500 text-sm">No jobs found for &ldquo;{query}&rdquo;</div>
                )}
                {filteredJobs.map((job) => (
                  <div key={job.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded object-cover border border-gray-200"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(job.company) + "&background=EEF3F8&color=0A66C2&size=48";
                      }}
                    />
                    <div className="flex-1">
                      <Link href={"/jobs/" + job.id} className="font-semibold text-sm text-gray-900 hover:underline">
                        {job.title}
                      </Link>
                      <Link href={"/company/" + job.companyId} className="block text-sm text-gray-600 hover:underline">
                        {job.company}
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={11} /> {job.type}</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <Link
                      href={"/jobs/" + job.id}
                      className="text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-4 py-1.5 hover:bg-blue-50 transition-colors flex-shrink-0"
                    >
                      Apply
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Companies" && (
              <div className="space-y-4">
                {filteredCompanies.length === 0 && (
                  <div className="py-10 text-center text-gray-500 text-sm">No companies found for &ldquo;{query}&rdquo;</div>
                )}
                {filteredCompanies.map((company) => (
                  <div key={company.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-14 h-14 rounded object-cover border border-gray-200"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(company.name) + "&background=EEF3F8&color=0A66C2&size=56";
                      }}
                    />
                    <div className="flex-1">
                      <Link href={"/company/" + company.id} className="font-semibold text-sm text-gray-900 hover:underline">
                        {company.name}
                      </Link>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {company.headquarters}</span>
                        <span className="flex items-center gap-1"><Users size={11} /> {company.size}</span>
                        <span className="flex items-center gap-1"><Building size={11} /> {company.openJobs} open jobs</span>
                      </div>
                    </div>
                    <Link
                      href={"/company/" + company.id}
                      className="text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-4 py-1.5 hover:bg-blue-50 transition-colors flex-shrink-0"
                    >
                      Follow
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Tips */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Search size={16} className="text-[#0A66C2]" /> Search tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Use quotes for exact phrases: <span className="font-mono bg-gray-100 px-1 rounded">&quot;product manager&quot;</span></li>
            <li>• Search by company name to find employees and job listings</li>
            <li>• Filter by location to find opportunities near you</li>
            <li>• Try searching for skills like <span className="font-mono bg-gray-100 px-1 rounded">React</span> or <span className="font-mono bg-gray-100 px-1 rounded">Python</span></li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F3F2EF] flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
      <SearchResults />
    </Suspense>
  );
}
