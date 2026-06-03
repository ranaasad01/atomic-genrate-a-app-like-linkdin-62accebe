"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, Clock, Users, Bookmark, BookmarkCheck, Share2, CheckCircle, Building } from 'lucide-react';
import { JOBS } from "@/lib/mock-data";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = JOBS.find((j) => j.id === params.id) || JOBS[0];
  const [saved, setSaved] = useState(job.saved);
  const [applied, setApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleApply() {
    setShowModal(true);
  }

  function confirmApply() {
    setApplied(true);
    setShowModal(false);
  }

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-8">
        <Link href="/jobs" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0A66C2] font-medium mb-5">
          <ArrowLeft size={16} /> Back to jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          {/* Main Content */}
          <div className="space-y-4">
            {/* Job Header */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(job.company) + "&background=EEF3F8&color=0A66C2&size=64";
                  }}
                />
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
                  <Link href={"/company/" + job.companyId} className="text-[#0A66C2] font-medium hover:underline">
                    {job.company}
                  </Link>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> Posted {job.posted}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {job.applicants} applicants</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-sm bg-blue-50 text-[#0A66C2] font-medium px-3 py-1 rounded-full">{job.level}</span>
                {job.remote && <span className="text-sm bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full">Remote</span>}
                <span className="text-sm bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full">{job.salary}</span>
              </div>

              <div className="flex items-center gap-3">
                {applied ? (
                  <div className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-full">
                    <CheckCircle size={16} /> Applied!
                  </div>
                ) : (
                  <button
                    onClick={handleApply}
                    className="px-8 py-3 bg-[#0A66C2] text-white font-semibold rounded-full hover:bg-[#004182] transition-colors"
                  >
                    Easy Apply
                  </button>
                )}
                <button
                  onClick={() => setSaved(!saved)}
                  className={"flex items-center gap-2 px-4 py-3 border rounded-full font-semibold text-sm transition-colors " + (saved ? "border-[#0A66C2] text-[#0A66C2] bg-blue-50" : "border-gray-300 text-gray-600 hover:bg-gray-50")}
                >
                  {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  {saved ? "Saved" : "Save"}
                </button>
                <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-full text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About the role</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">{job.description}</p>

              <h3 className="text-base font-semibold text-gray-900 mb-3">Requirements</h3>
              <ul className="space-y-2 mb-6">
                {job.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-[#0A66C2] flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>

              <h3 className="text-base font-semibold text-gray-900 mb-3">Benefits & Perks</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3">About {job.company}</h3>
              <Link href={"/company/" + job.companyId} className="flex items-center gap-3 mb-3 group">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-10 h-10 rounded object-cover border border-gray-200"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(job.company) + "&background=EEF3F8&color=0A66C2&size=40";
                  }}
                />
                <span className="font-medium text-sm text-gray-900 group-hover:text-[#0A66C2] transition-colors">{job.company}</span>
              </Link>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Building size={14} className="text-gray-400" /> Technology</div>
                <div className="flex items-center gap-2"><Users size={14} className="text-gray-400" /> 5,001 - 10,000 employees</div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400" /> San Francisco, CA</div>
              </div>
              <Link href={"/company/" + job.companyId} className="mt-3 block text-center text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full py-2 hover:bg-blue-50 transition-colors">
                View company
              </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Similar jobs</h3>
              <div className="space-y-3">
                {JOBS.filter((j) => j.id !== job.id).slice(0, 3).map((j) => (
                  <Link key={j.id} href={"/jobs/" + j.id} className="flex items-start gap-2 group">
                    <img
                      src={j.logo}
                      alt={j.company}
                      className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(j.company) + "&background=EEF3F8&color=0A66C2&size=32";
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#0A66C2] transition-colors">{j.title}</p>
                      <p className="text-xs text-gray-500">{j.company}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Apply to {job.company}</h2>
            <p className="text-sm text-gray-500 mb-5">Review your application for <strong>{job.title}</strong></p>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-500 hover:border-[#0A66C2] cursor-pointer transition-colors">
                  Upload resume (PDF, DOC)
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover letter (optional)</label>
                <textarea rows={3} placeholder="Why are you interested in this role?" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] resize-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={confirmApply} className="flex-1 py-2.5 bg-[#0A66C2] text-white rounded-full text-sm font-semibold hover:bg-[#004182] transition-colors">
                Submit application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
