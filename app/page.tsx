"use client";

import Link from "next/link";
import { ArrowRight, Users, Briefcase, Star, CheckCircle, Globe, TrendingUp, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#0A66C2] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">PC</span>
            </div>
            <span className="text-xl font-bold text-[#0A66C2]">ProConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/jobs" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Find Jobs</Link>
            <Link href="/network" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Network</Link>
            <Link href="/company/stripe" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Companies</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-[#0A66C2] transition-colors">
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-[#0A66C2] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#004182] transition-colors"
            >
              Join now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#EEF3F8] via-white to-[#F3F2EF]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Welcome to your
              <span style={{ backgroundColor: "", color: "blue" }} className="text-[#0A66C2]"> professional</span> community
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with millions of professionals, discover opportunities, and build the career you deserve. ProConnect is where ambition meets opportunity.
testing
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 bg-[#0A66C2] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#004182] transition-colors text-lg"
              >
                Get started — it&apos;s free <ArrowRight size={20} />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 border-2 border-[#0A66C2] text-[#0A66C2] font-semibold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-colors text-lg"
              >
                Sign in
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">900M+</p>
                <p className="text-sm text-gray-500">Members</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">58M+</p>
                <p className="text-sm text-gray-500">Companies</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">15M+</p>
                <p className="text-sm text-gray-500">Open Jobs</p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://sc-cms-prod103-cdn-dsb5cvath4adbgd0.z01.azurefd.net/-/media/images/astoncarter/insights/articles/benefits_of_networking_article_image-jpg.jpg?rev=d62d8ede82884f01a87392d384fc6808"
              alt="Professional networking"
              className="rounded-2xl shadow-2xl w-full object-cover h-96"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to grow your career</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ProConnect brings together the tools, connections, and insights you need to take your professional life to the next level.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                color: "bg-blue-100 text-[#0A66C2]",
                title: "Build Your Network",
                desc: "Connect with colleagues, industry leaders, and potential collaborators. Your network is your net worth — grow it strategically.",
              },
              {
                icon: Briefcase,
                color: "bg-green-100 text-green-600",
                title: "Find Your Dream Job",
                desc: "Browse millions of job listings from top companies. Get personalized recommendations based on your skills and experience.",
              },
              {
                icon: TrendingUp,
                color: "bg-purple-100 text-purple-600",
                title: "Grow Your Skills",
                desc: "Access courses, articles, and insights from industry experts. Stay ahead of the curve with continuous learning.",
              },
              {
                icon: Star,
                color: "bg-yellow-100 text-yellow-600",
                title: "Build Your Brand",
                desc: "Showcase your achievements, skills, and experience. Let your profile do the talking and attract the right opportunities.",
              },
              {
                icon: Globe,
                color: "bg-orange-100 text-orange-600",
                title: "Global Reach",
                desc: "Connect with professionals across 200+ countries. Break geographic barriers and explore international opportunities.",
              },
              {
                icon: Shield,
                color: "bg-red-100 text-red-600",
                title: "Trusted & Secure",
                desc: "Your data is protected with enterprise-grade security. Control who sees your profile and how you appear in searches.",
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-xl border border-gray-100 hover:border-[#0A66C2] hover:shadow-md transition-all group">
                <div className={"w-12 h-12 rounded-lg flex items-center justify-center mb-4 " + feature.color}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#0A66C2] transition-colors">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-[#F3F2EF]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by professionals worldwide</h2>
            <p className="text-lg text-gray-600">See what our members are saying about ProConnect</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                title: "Product Manager at Google",
                avatar: "https://imageio.forbes.com/specials-images/imageserve/5c928fa04bbe6f52641ab341/0x0.jpg?format=jpg&crop=2124,2123,x980,y756,safe&height=416&width=416&fit=bounds",
                quote: "ProConnect helped me land my dream job at Google. The networking features are unmatched — I connected with my hiring manager directly through the platform.",
              },
              {
                name: "Marcus Williams",
                title: "UX Director at Adobe",
                avatar: "https://static.clubs.nfl.com/image/upload/t_editorial_landscape_mobile/f_png/ravens/vkeaskeyi2nes6jtsppz.png",
                quote: "I've built my entire professional brand on ProConnect. The ability to share my work and get endorsements from colleagues has been invaluable for my career growth.",
              },
              {
                name: "Priya Patel",
                title: "Data Scientist at Netflix",
                avatar: "https://providers.atriumhealth.org/sparkle-assets/preview_thumbnails/physicians/16941/doctor_finder-e5f236ee24be4097be0c1e08258a3bed.jpg",
                quote: "The job recommendations are incredibly accurate. ProConnect understood my skills and career goals better than any other platform I've used.",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(testimonial.name) + "&background=0A66C2&color=fff";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A66C2]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to take the next step in your career?</h2>
          <p style={{ fontFamily: "Inter", fontSize: "30px" }} className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join over 900 million professionals on ProConnect. Your next opportunity is just one connection away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 bg-white text-[#0A66C2] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg"
            >
              Join ProConnect for free <ArrowRight size={20} />
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-10 py-4 rounded-full hover:bg-blue-700 transition-colors text-lg"
            >
              Sign in
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10">
            {["No credit card required", "Free forever plan", "Cancel anytime"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-blue-100 text-sm">
                <CheckCircle size={16} className="text-white" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PC</span>
                </div>
                <span className="text-lg font-bold text-[#0A66C2]">ProConnect</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                The professional network for the modern workforce. Connect, grow, and succeed.
              </p>
            </div>
            {[
              { title: "Product", links: ["Feed", "Jobs", "Network", "Messaging"] },
              { title: "Company", links: ["About", "Careers", "Press", "Blog"] },
              { title: "Support", links: ["Help Center", "Privacy", "Terms", "Accessibility"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="/feed" className="text-sm text-gray-500 hover:text-[#0A66C2] transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">© 2025 ProConnect. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/settings" className="text-xs text-gray-400 hover:text-gray-600">Privacy Policy</Link>
              <Link href="/settings" className="text-xs text-gray-400 hover:text-gray-600">Terms of Service</Link>
              <Link href="/settings" className="text-xs text-gray-400 hover:text-gray-600">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}