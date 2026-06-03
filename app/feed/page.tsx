import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import PostComposer from "@/components/PostComposer";
import PostCard from "@/components/PostCard";
import { POSTS } from "@/lib/mock-data";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#F3F2EF]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-5">
          <div className="hidden lg:block">
            <LeftSidebar />
          </div>

          <div className="space-y-3">
            <PostComposer />
            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            <div className="text-center py-6">
              <p className="text-sm text-gray-500" style={{ fontFamily: "Inter", fontSize: "20px" }}>You&apos;ve seen all recent posts</p>
              <button className="mt-2 text-sm font-semibold text-[#0A66C2] hover:underline">
                Load more
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}