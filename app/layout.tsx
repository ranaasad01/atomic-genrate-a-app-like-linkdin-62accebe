import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProConnect — Connect. Grow. Succeed.",
  description: "The professional network for the modern workforce. Connect with colleagues, find jobs, and grow your career.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#F3F2EF] min-h-screen"}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
