"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { MapPin, Globe, Mail, Phone, Edit, UserPlus, MessageSquare, MoreHorizontal, Award, CheckCircle } from 'lucide-react';
import { CURRENT_USER, EXPERIENCES, EDUCATION, SKILLS, RECOMMENDATIONS, USERS } from "@/lib/mock-data";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const isOwn = params.id === "1";
  const user = USERS.find((u) => u.id === params.id) || USERS[0];

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-8 space-y-4">

        {/* Profile Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-[#0A66C2] to-[#004182] relative">
            <img
              src={CURRENT_USER.banner}
              alt="Banner"
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-12 mb-4">
              <img
                src={isOwn ? CURRENT_USER.avatar : user.avatar}
                alt={isOwn ? CURRENT_USER.name : user.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(isOwn ? CURRENT_USER.name : user.name) + "&background=0A66C2&color=fff&size=96";
                }}
              />
              <div className="flex items-center gap-2 mt-14">
                {isOwn ? (
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-1.5 px-4 py-2 border border-[#0A66C2] text-[#0A66C2] text-sm font-semibold rounded-full hover:bg-blue-50 transition-colors"
                  >
                    <Edit size={14} /> Edit profile
                  </Link>
                ) : (
                  <>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0A66C2] text-white text-sm font-semibold rounded-full hover:bg-[#004182] transition-colors">
                      <UserPlus size={14} /> Connect
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 border border-[#0A66C2] text-[#0A66C2] text-sm font-semibold rounded-full hover:bg-blue-50 transition-colors">
                      <MessageSquare size={14} /> Message
                    </button>
                    <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 text-gray-500">
                      <MoreHorizontal size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">{isOwn ? CURRENT_USER.name : user.name}</h1>
            <p className="text-gray-700 mt-1">{isOwn ? CURRENT_USER.headline : user.headline}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={14} /> {isOwn ? CURRENT_USER.location : user.location}</span>
              {isOwn && (
                <>
                  <span className="flex items-center gap-1"><Globe size={14} /> <a href={CURRENT_USER.website} className="text-[#0A66C2] hover:underline">{CURRENT_USER.website}</a></span>
                  <span className="flex items-center gap-1"><Mail size={14} /> {CURRENT_USER.email}</span>
                  <span className="flex items-center gap-1"><Phone size={14} /> {CURRENT_USER.phone}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <Link href="/network" className="text-sm font-semibold text-[#0A66C2] hover:underline">
                {isOwn ? CURRENT_USER.connections : user.connections} connections
              </Link>
              {!isOwn && user.mutual > 0 && (
                <span className="text-sm text-gray-500">{user.mutual} mutual connections</span>
              )}
            </div>
          </div>
        </div>

        {/* About */}
        {isOwn && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              {isOwn && <Link href="/profile/edit" className="text-gray-400 hover:text-gray-600"><Edit size={16} /></Link>}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{CURRENT_USER.bio}</p>
          </div>
        )}

        {/* Experience */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
            {isOwn && <Link href="/profile/edit" className="text-gray-400 hover:text-gray-600"><Edit size={16} /></Link>}
          </div>
          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.id} className={"flex gap-4 " + (i < EXPERIENCES.length - 1 ? "pb-6 border-b border-gray-100" : "")}>
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="w-12 h-12 rounded object-cover border border-gray-200 flex-shrink-0"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(exp.company) + "&background=EEF3F8&color=0A66C2&size=48";
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                  <p className="text-sm text-gray-700">{exp.company} · {exp.type}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{exp.start} – {exp.end} · {exp.location}</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Education</h2>
            {isOwn && <Link href="/profile/edit" className="text-gray-400 hover:text-gray-600"><Edit size={16} /></Link>}
          </div>
          <div className="space-y-6">
            {EDUCATION.map((edu, i) => (
              <div key={edu.id} className={"flex gap-4 " + (i < EDUCATION.length - 1 ? "pb-6 border-b border-gray-100" : "")}>
                <img
                  src={edu.logo}
                  alt={edu.school}
                  className="w-12 h-12 rounded object-cover border border-gray-200 flex-shrink-0"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(edu.school.slice(0, 2)) + "&background=EEF3F8&color=0A66C2&size=48";
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{edu.school}</h3>
                  <p className="text-sm text-gray-700" style={{ fontFamily: "Inter", fontSize: "20px" }}>{edu.degree}, {edu.field}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{edu.start} – {edu.end}</p>
                  {edu.activities && <p className="text-sm text-gray-600 mt-1">{edu.activities}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            {isOwn && <Link href="/profile/edit" className="text-gray-400 hover:text-gray-600"><Edit size={16} /></Link>}
          </div>
          <div className="space-y-3">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#0A66C2]" />
                  <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{skill.endorsements} endorsements</span>
                  {!isOwn && (
                    <button className="text-xs font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-2 py-0.5 hover:bg-blue-50 transition-colors">
                      Endorse
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
            {isOwn && <Link href="/profile/edit" className="text-gray-400 hover:text-gray-600"><Edit size={16} /></Link>}
          </div>
          <div className="space-y-6">
            {RECOMMENDATIONS.map((rec, i) => (
              <div key={rec.id} className={"pb-6 " + (i < RECOMMENDATIONS.length - 1 ? "border-b border-gray-100" : "")}>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={rec.author.avatar}
                    alt={rec.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(rec.author.name) + "&background=0A66C2&color=fff";
                    }}
                  />
                  <div>
                    <Link href={"/profile/" + rec.author.id} className="font-semibold text-sm text-gray-900 hover:underline">
                      {rec.author.name}
                    </Link>
                    <p className="text-xs text-gray-500">{rec.author.headline}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{rec.relationship} · {rec.date}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">&ldquo;{rec.text}&rdquo;</p>
              </div>
            ))}
          </div>
          {!isOwn && (
            <button className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-4 py-2 hover:bg-blue-50 transition-colors">
              <Award size={14} /> Request recommendation
            </button>
          )}
        </div>

      </main>
    </div>
  );
}