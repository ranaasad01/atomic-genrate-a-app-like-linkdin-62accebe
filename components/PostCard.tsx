"use client";
import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, MessageCircle, Share2, Send, MoreHorizontal } from 'lucide-react';

interface PostAuthor {
  id: string;
  name: string;
  headline: string;
  avatar: string;
}

interface PostCardProps {
  post: {
    id: string;
    author: PostAuthor;
    content: string;
    image: string | null;
    likes: number;
    comments: number;
    shares: number;
    time: string;
    liked: boolean;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  function handleLike() {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  }

  function handleAvatarError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    img.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(post.author.name) + "&background=0A66C2&color=fff";
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Link href={"/profile/" + post.author.id}>
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                onError={handleAvatarError}
              />
            </Link>
            <div>
              <Link href={"/profile/" + post.author.id} className="font-semibold text-sm text-gray-900 hover:underline">
                {post.author.name}
              </Link>
              <p className="text-xs text-gray-500 line-clamp-1">{post.author.headline}</p>
              <p className="text-xs text-gray-400 mt-0.5">{post.time}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="mt-3 text-sm text-gray-800 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>
      </div>

      {post.image && (
        <img
          src={post.image}
          alt="Post image"
          className="w-full max-h-80 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{likeCount.toLocaleString()} reactions</span>
          <span>{post.comments} comments · {post.shares} shares</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleLike}
            className={"flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium flex-1 justify-center transition-colors " + (liked ? "text-[#0A66C2] bg-blue-50" : "text-gray-500 hover:bg-gray-100")}
          >
            <ThumbsUp size={16} className={liked ? "fill-[#0A66C2]" : ""} />
            Like
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium text-gray-500 hover:bg-gray-100 flex-1 justify-center transition-colors"
          >
            <MessageCircle size={16} />
            Comment
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium text-gray-500 hover:bg-gray-100 flex-1 justify-center transition-colors">
            <Share2 size={16} />
            Share
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium text-gray-500 hover:bg-gray-100 flex-1 justify-center transition-colors">
            <Send size={16} />
            Send
          </button>
        </div>
      </div>

      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          <div className="flex gap-2">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTVlYmRhMWQtNmE0Yi00ODM1LWEzMWEtNTQzZGZhODRmZTE0XkEyXkFqcGc@._V1_.jpg"
              alt="You"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Alex+Johnson&background=0A66C2&color=fff";
              }}
            />
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button
                onClick={() => setComment("")}
                className="text-[#0A66C2] font-semibold text-sm disabled:opacity-40"
                disabled={!comment.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
