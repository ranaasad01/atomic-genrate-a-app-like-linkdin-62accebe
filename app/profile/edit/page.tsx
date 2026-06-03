"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Save, ArrowLeft, Plus, Trash2, Camera } from 'lucide-react';
import { CURRENT_USER, EXPERIENCES, EDUCATION, SKILLS } from "@/lib/mock-data";

export default function EditProfilePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("basic");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: CURRENT_USER.name,
    headline: CURRENT_USER.headline,
    location: CURRENT_USER.location,
    bio: CURRENT_USER.bio,
    email: CURRENT_USER.email,
    website: CURRENT_USER.website,
    phone: CURRENT_USER.phone,
  });
  const [skills, setSkills] = useState(SKILLS.map((s) => s.name));
  const [newSkill, setNewSkill] = useState("");

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push("/profile/1");
    }, 1500);
  }

  function addSkill() {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((s) => [...s, newSkill.trim()]);
      setNewSkill("");
    }
  }

  function removeSkill(skill: string) {
    setSkills((s) => s.filter((x) => x !== skill));
  }

  const sections = [
    { id: "basic", label: "Basic Info" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/profile/1" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0A66C2] font-medium">
            <ArrowLeft size={16} /> Back to profile
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5">
          {/* Section Nav */}
          <aside className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 h-fit">
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={"w-full text-left px-3 py-2.5 rounded text-sm font-medium transition-colors " + (activeSection === s.id ? "bg-blue-50 text-[#0A66C2]" : "text-gray-700 hover:bg-gray-50")}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Form Area */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            {activeSection === "basic" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Basic Information</h2>
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={CURRENT_USER.avatar}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Alex+Johnson&background=0A66C2&color=fff&size=80";
                      }}
                    />
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#0A66C2] rounded-full flex items-center justify-center text-white hover:bg-[#004182]">
                      <Camera size={12} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Profile photo</p>
                    <p className="text-xs text-gray-500 mt-0.5">JPG, PNG or GIF. Max 5MB.</p>
                    <button className="mt-1.5 text-xs font-semibold text-[#0A66C2] hover:underline">Upload photo</button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                      <input
                        type="text"
                        value={form.name.split(" ")[0]}
                        onChange={(e) => update("name", e.target.value + " " + form.name.split(" ").slice(1).join(" "))}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                      <input
                        type="text"
                        value={form.name.split(" ").slice(1).join(" ")}
                        onChange={(e) => update("name", form.name.split(" ")[0] + " " + e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Headline</label>
                    <input
                      type="text"
                      value={form.headline}
                      onChange={(e) => update("headline", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
                    />
                    <p className="text-xs text-gray-400 mt-1">{form.headline.length}/220 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "about" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">About</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Summary</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 resize-none"
                    placeholder="Write a summary about yourself..."
                  />
                  <p className="text-xs text-gray-400 mt-1">{form.bio.length}/2600 characters</p>
                </div>
              </div>
            )}

            {activeSection === "experience" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors">
                    <Plus size={14} /> Add experience
                  </button>
                </div>
                <div className="space-y-4">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-10 h-10 rounded object-cover border border-gray-200"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(exp.company) + "&background=EEF3F8&color=0A66C2&size=40";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">{exp.title}</p>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                        <p className="text-xs text-gray-400">{exp.start} – {exp.end}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-[#0A66C2] p-1"><Plus size={14} /></button>
                        <button className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "education" && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">Education</h2>
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] border border-[#0A66C2] rounded-full px-3 py-1.5 hover:bg-blue-50 transition-colors">
                    <Plus size={14} /> Add education
                  </button>
                </div>
                <div className="space-y-4">
                  {EDUCATION.map((edu) => (
                    <div key={edu.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={edu.logo}
                        alt={edu.school}
                        className="w-10 h-10 rounded object-cover border border-gray-200"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(edu.school.slice(0, 2)) + "&background=EEF3F8&color=0A66C2&size=40";
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">{edu.school}</p>
                        <p className="text-sm text-gray-600">{edu.degree}, {edu.field}</p>
                        <p className="text-xs text-gray-400">{edu.start} – {edu.end}</p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "skills" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Skills</h2>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add a skill (e.g. Python)"
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2.5 bg-[#0A66C2] text-white text-sm font-semibold rounded-lg hover:bg-[#004182] transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="flex items-center gap-1.5 bg-blue-50 text-[#0A66C2] text-sm font-medium px-3 py-1.5 rounded-full border border-blue-200">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="text-blue-400 hover:text-red-500 transition-colors">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
              <Link href="/profile/1" className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                Cancel
              </Link>
              <button
                onClick={handleSave}
                className={"flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full transition-colors " + (saved ? "bg-green-500 text-white" : "bg-[#0A66C2] text-white hover:bg-[#004182]")}
              >
                <Save size={14} />
                {saved ? "Saved!" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
