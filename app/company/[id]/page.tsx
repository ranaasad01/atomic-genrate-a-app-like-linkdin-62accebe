"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { MapPin, Users, Globe, Calendar, Briefcase, Bell, Share2, CheckCircle, ArrowRight } from 'lucide-react';
import { COMPANIES, JOBS } from "@/lib/mock-data";

export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  const company = COMPANIES.find((c) => c.id === params.id) || COMPANIES[0];
  const [following, setFollowing] = useState(company.following);
  const [activeTab, setActiveTab] = useState("About");

  const companyJobs = JOBS.filter((j) => j.companyId === company.id);
  const tabs = ["About", "Jobs", "People", "Posts"];

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-8 space-y-4">

        {/* Company Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-[#0A66C2] to-[#004182] relative">
            <img
              src={company.banner}
              alt={company.name + " banner"}
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="px-6 pb-5">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 rounded-lg border-4 border-white object-cover shadow-md bg-white"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(company.name) + "&background=EEF3F8&color=0A66C2&size=80";
                }}
              />
              <div className="flex items-center gap-2 mt-12">
                <button
                  onClick={() => setFollowing(!following)}
                  className={"flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-colors " + (following ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-[#0A66C2] text-white hover:bg-[#004182]")}
                >
                  {following ? <CheckCircle size={14} /> : <Bell size={14} />}
                  {following ? "Following" : "Follow"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-gray-600 mt-1">{company.tagline}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Briefcase size={14} /> {company.industry}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {company.headquarters}</span>
              <span className="flex items-center gap-1.5"><Users size={14} /> {company.size}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> Founded {company.founded}</span>
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#0A66C2] hover:underline">
                <Globe size={14} /> {company.website}
              </a>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="font-semibold text-gray-900">{(company.followers / 1000).toFixed(0)}K</span>
              <span className="text-gray-500">followers</span>
              <span className="text-gray-300">·</span>
              <span className="font-semibold text-[#0A66C2]">{company.openJobs} open jobs</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-100 px-6 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={"px-4 py-3 text-sm font-medium border-b-2 transition-colors " + (activeTab === tab ? "border-[#0A66C2] text-[#0A66C2]" : "border-transparent text-gray-500 hover:text-gray-900")}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "About" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About {company.name}</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">{company.about}</p>
              <h3 className="text-base font-semibold text-gray-900 mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {company.specialties.map((s) => (
                  <span key={s} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Company details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Briefcase size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs">Industry</p>
                      <p className="text-gray-800 font-medium">{company.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs">Company size</p>
                      <p className="text-gray-800 font-medium">{company.size}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs">Headquarters</p>
                      <p className="text-gray-800 font-medium">{company.headquarters}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-xs">Founded</p>
                      <p className="text-gray-800 font-medium">{company.founded}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Jobs" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Open positions at {company.name}</h2>
              <span className="text-sm text-gray-500">{companyJobs.length} jobs</span>
            </div>
            {companyJobs.length === 0 ? (
              <div className="py-10 text-center text-gray-500 text-sm">No open positions at this time</div>
            ) : (
              <div className="space-y-4">
                {companyJobs.map((job) => (
                  <div key={job.id} className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-sm transition-all">
                    <div>
                      <Link href={"/jobs/" + job.id} className="font-semibold text-sm text-gray-900 hover:text-[#0A66C2] transition-colors">
                        {job.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                        <span>{job.type}</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <Link
                      href={"/jobs/" + job.id}
                      className="flex items-center gap-1 text-sm font-semibold text-[#0A66C2] hover:underline flex-shrink-0"
                    >
                      Apply <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "People" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">People at {company.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Jennifer Park", title: "Engineering Manager", avatar: "https://images.squarespace-cdn.com/content/v1/5a58ddef7131a5bcf998ff80/a99de45c-32a1-453e-a53e-f29896ee18a3/MK_20200929_6_Jennifer_Park_1575-Edit.jpg" },
                { name: "David Kim", title: "Senior Product Designer", avatar: "https://images.squarespace-cdn.com/content/v1/5a58ddef7131a5bcf998ff80/a99de45c-32a1-453e-a53e-f29896ee18a3/MK_20200929_6_Jennifer_Park_1575-Edit.jpg" },
                { name: "Rachel Torres", title: "Head of Marketing", avatar: "https://images.squarespace-cdn.com/content/v1/5a58ddef7131a5bcf998ff80/a99de45c-32a1-453e-a53e-f29896ee18a3/MK_20200929_6_Jennifer_Park_1575-Edit.jpg" },
                { name: "Michael Chen", title: "Staff Engineer", avatar: "https://images.squarespace-cdn.com/content/v1/5ecc793f6fe67345534cb3a0/1598902513971-XGCOMACFXAB87NT0XCIW/David+Kim" },
              ].map((person) => (
                <div key={person.name} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(person.name) + "&background=0A66C2&color=fff";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Posts" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Recent posts from {company.name}</h2>
            <div className="space-y-5">
              {[
                {
                  text: "We're thrilled to announce our latest product update! Our team has been working hard to bring you new features that make your workflow even more seamless. Check out the full release notes on our blog.",
                  time: "2 days ago",
                  likes: 1243,
                },
                {
                  text: "Join us at TechConf 2025! Our engineering team will be presenting on scalable distributed systems. Come say hi at booth #42. Register with code PROCONNECT for 20% off.",
                  time: "1 week ago",
                  likes: 892,
                },
              ].map((post, i) => (
                <div key={i} className="pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-10 h-10 rounded object-cover border border-gray-200"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(company.name) + "&background=EEF3F8&color=0A66C2&size=40";
                      }}
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{company.name}</p>
                      <p className="text-xs text-gray-400">{post.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{post.text}</p>
                  <p className="text-xs text-gray-400 mt-2">{post.likes.toLocaleString()} reactions</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
