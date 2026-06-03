"use client";
import { useState } from "react";
import { Image, FileText, Calendar, MoreHorizontal } from 'lucide-react';

export default function PostComposer() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  function handleSubmit() {
    if (text.trim()) {
      setText("");
      setOpen(false);
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      {!open ? (
        <div className="flex items-center gap-3">
          <img
            src="https://m.media-amazon.com/images/M/MV5BMTVlYmRhMWQtNmE0Yi00ODM1LWEzMWEtNTQzZGZhODRmZTE0XkEyXkFqcGc@._V1_.jpg"
            alt="You"
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Alex+Johnson&background=0A66C2&color=fff";
            }}
          />
          <button
            onClick={() => setOpen(true)}
            className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full text-sm text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Start a post
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTVlYmRhMWQtNmE0Yi00ODM1LWEzMWEtNTQzZGZhODRmZTE0XkEyXkFqcGc@._V1_.jpg"
              alt="You"
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Alex+Johnson&background=0A66C2&color=fff";
              }}
            />
            <div>
              <p className="font-semibold text-sm">Alex Johnson</p>
              <p className="text-xs text-gray-500">Post to Anyone</p>
            </div>
          </div>
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full min-h-[120px] text-sm text-gray-800 outline-none resize-none placeholder-gray-400"
          />
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <button className="p-2 text-gray-500 hover:text-[#0A66C2] hover:bg-blue-50 rounded transition-colors">
                <Image size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-[#0A66C2] hover:bg-blue-50 rounded transition-colors">
                <FileText size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-[#0A66C2] hover:bg-blue-50 rounded transition-colors">
                <Calendar size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-[#0A66C2] hover:bg-blue-50 rounded transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="px-4 py-1.5 text-sm font-semibold bg-[#0A66C2] text-white rounded-full hover:bg-[#004182] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {!open && (
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded transition-colors flex-1 justify-center">
            <Image size={18} className="text-blue-500" /> Photo
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded transition-colors flex-1 justify-center">
            <FileText size={18} className="text-orange-500" /> Write article
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded transition-colors flex-1 justify-center">
            <Calendar size={18} className="text-yellow-500" /> Event
          </button>
        </div>
      )}
    </div>
  );
}
