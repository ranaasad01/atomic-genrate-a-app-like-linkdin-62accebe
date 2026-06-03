"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      router.push("/feed");
    } else {
      setError("Invalid email or password. Please try again.");
    }
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-500 text-sm mb-6">Stay updated on your professional world</p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email or phone</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
                <Link href="#" className="text-sm text-[#0A66C2] font-semibold hover:underline mt-1 block text-right">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A66C2] text-white font-semibold py-3 rounded-full hover:bg-[#004182] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-gray-400">or</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-full py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mb-3">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-full py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-4 h-4" />
              Continue with Apple
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              New to ProConnect?{" "}
              <Link href="/register" className="text-[#0A66C2] font-semibold hover:underline">
                Join now
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              By signing in, you agree to ProConnect&apos;s{" "}
              <Link href="/settings" className="text-gray-600 hover:underline">User Agreement</Link>,{" "}
              <Link href="/settings" className="text-gray-600 hover:underline">Privacy Policy</Link>, and{" "}
              <Link href="/settings" className="text-gray-600 hover:underline">Cookie Policy</Link>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
