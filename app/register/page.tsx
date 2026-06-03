"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    headline: "",
    location: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setStep(2);
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await login(form.email, form.password);
    setLoading(false);
    router.push("/feed");
  }

  return (
    <div className="min-h-screen bg-[#F3F2EF] flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 bg-[#0A66C2] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">PC</span>
          </div>
          <span className="text-xl font-bold text-[#0A66C2]">ProConnect</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold " + (step >= 1 ? "bg-[#0A66C2] text-white" : "bg-gray-200 text-gray-500")}>
                {step > 1 ? <CheckCircle size={16} /> : "1"}
              </div>
              <div className={"flex-1 h-1 rounded " + (step >= 2 ? "bg-[#0A66C2]" : "bg-gray-200")} />
              <div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold " + (step >= 2 ? "bg-[#0A66C2] text-white" : "bg-gray-200 text-gray-500")}>
                2
              </div>
            </div>

            {step === 1 && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Make the most of your professional life</h1>
                <p className="text-gray-500 text-sm mb-6">Create your free ProConnect account</p>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <form onSubmit={handleStep1} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="First name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password (6+ characters)</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        placeholder="Create a password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 transition-colors pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0A66C2] text-white font-semibold py-3 rounded-full hover:bg-[#004182] transition-colors text-sm"
                  >
                    Continue
                  </button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Complete your profile</h1>
                <p className="text-gray-500 text-sm mb-6">Help others find you and understand your background</p>

                <form onSubmit={handleStep2} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Professional headline</label>
                    <input
                      type="text"
                      value={form.headline}
                      onChange={(e) => update("headline", e.target.value)}
                      placeholder="e.g. Software Engineer at Google"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 transition-colors"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-[#0A66C2] mb-2">Why complete your profile?</h3>
                    <ul className="space-y-1.5">
                      {[
                        "Get discovered by recruiters",
                        "Receive personalized job recommendations",
                        "Build credibility with your network",
                        "Unlock all ProConnect features",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle size={12} className="text-[#0A66C2] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0A66C2] text-white font-semibold py-3 rounded-full hover:bg-[#004182] transition-colors disabled:opacity-60 text-sm"
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                  <button
                    type="button"
                    onClick={handleStep2}
                    className="w-full text-gray-500 text-sm hover:underline"
                  >
                    Skip for now
                  </button>
                </form>
              </>
            )}

            <p className="text-center text-sm text-gray-500 mt-6">
              Already on ProConnect?{" "}
              <Link href="/login" className="text-[#0A66C2] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
