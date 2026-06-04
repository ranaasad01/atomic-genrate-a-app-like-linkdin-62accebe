"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const PROJECT_ID = process.env.NEXT_PUBLIC_ATOMIC_PROJECT_ID ?? "";
const CHAT_TOKEN = process.env.NEXT_PUBLIC_ATOMIC_CHAT_TOKEN ?? "";
const BAKED_WELCOME = process.env.NEXT_PUBLIC_ATOMIC_CHAT_WELCOME ?? "";
const API_BASE = (process.env.NEXT_PUBLIC_ATOMIC_API_URL ?? "").replace(/\/$/, "");

function chatApiBase(): string {
  if (API_BASE) return API_BASE;
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/atomic-chat`;
  }
  return "";
}

const INLINE_MD_RE =
  /(\*\*[^*\n]+?\*\*|\*[^*\n]+?\*|`[^`\n]+?`|\[[^\]]+?\]\([^)]+?\))/g;

function renderInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = INLINE_MD_RE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${idx++}`;
    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key} className="atomic-md-code">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (link) {
        nodes.push(
          <a
            key={key}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="atomic-md-link"
          >
            {link[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    } else {
      nodes.push(token);
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function ChatMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let bulletItems: string[] = [];
  let orderedItems: string[] = [];

  const flushBullets = () => {
    if (!bulletItems.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="atomic-md-ul">
        {bulletItems.map((item, i) => (
          <li key={i}>{renderInlineMarkdown(item, `ul-${blocks.length}-${i}`)}</li>
        ))}
      </ul>,
    );
    bulletItems = [];
  };

  const flushOrdered = () => {
    if (!orderedItems.length) return;
    blocks.push(
      <ol key={`ol-${blocks.length}`} className="atomic-md-ol">
        {orderedItems.map((item, i) => (
          <li key={i}>{renderInlineMarkdown(item, `ol-${blocks.length}-${i}`)}</li>
        ))}
      </ol>,
    );
    orderedItems = [];
  };

  const flushLists = () => {
    flushBullets();
    flushOrdered();
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    const bullet = /^[-*•]\s+(.+)$/.exec(trimmed);
    const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (bullet) {
      flushOrdered();
      bulletItems.push(bullet[1]);
      continue;
    }
    if (ordered) {
      flushBullets();
      orderedItems.push(ordered[1]);
      continue;
    }
    flushLists();
    if (!trimmed) {
      if (blocks.length) blocks.push(<div key={`sp-${blocks.length}`} className="atomic-md-spacer" />);
      continue;
    }
    blocks.push(
      <p key={`p-${blocks.length}`} className="atomic-md-p">
        {renderInlineMarkdown(trimmed, `p-${blocks.length}`)}
      </p>,
    );
  }
  flushLists();
  return <div className="atomic-chat-md">{blocks}</div>;
}

export default function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [welcome, setWelcome] = useState("Hi! How can I help you today?");
  const [chatActive, setChatActive] = useState(false);
  const [configReady, setConfigReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const base = chatApiBase();
    if (!PROJECT_ID || !base) {
      setConfigReady(true);
      setError("Chat is not configured for this site (missing project id or API URL).");
      return;
    }

    if (CHAT_TOKEN) {
      setChatActive(true);
      if (BAKED_WELCOME) setWelcome(BAKED_WELCOME);
      setConfigReady(true);
      return;
    }

    fetch(`${base}/projects/${PROJECT_ID}/chatbot/public`)
      .then(async (res) => {
        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          throw new Error(
            res.status === 404
              ? "Chat could not reach the API. Refresh preview after Save, or allow local network access if prompted."
              : `Chat service unavailable (${res.status}). ${detail.slice(0, 120)}`,
          );
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.enabled) {
          setChatActive(false);
          setError("Chat is turned off. Enable it in Admin → LLM and save.");
          return;
        }
        setChatActive(true);
        setError(null);
        if (data.welcome_message) setWelcome(data.welcome_message);
        if (data.visitor_chat_token) {
          (window as unknown as { __ATOMIC_CHAT_TOKEN?: string }).__ATOMIC_CHAT_TOKEN =
            data.visitor_chat_token;
        }
      })
      .catch((err) => {
        if (!CHAT_TOKEN) {
          setChatActive(false);
          setError(err instanceof Error ? err.message : "Could not connect to chat service.");
        }
      })
      .finally(() => setConfigReady(true));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  const canSend = chatActive && configReady && !loading;

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!chatActive) {
      setError(
        error ??
          "Chat is not ready yet. Wait a moment, or republish after setting a public API URL.",
      );
      return;
    }
    const token =
      CHAT_TOKEN || (window as unknown as { __ATOMIC_CHAT_TOKEN?: string }).__ATOMIC_CHAT_TOKEN || "";
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch(`${chatApiBase()}/projects/${PROJECT_ID}/visitor-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.detail || "Chat request failed");
      }
      if (data.session_id) setSessionId(data.session_id);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "" }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [input, loading, chatActive, sessionId, error]);

  if (!PROJECT_ID) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-2 font-sans">
      <style>{`
        @keyframes atomic-chat-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .atomic-typing-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #9ca3af;
          animation: atomic-chat-typing 0.9s ease-in-out infinite;
        }
        .atomic-chat-md { line-height: 1.45; }
        .atomic-md-p { margin: 0.15rem 0; }
        .atomic-md-ul, .atomic-md-ol { margin: 0.35rem 0; padding-left: 1.15rem; }
        .atomic-md-ul { list-style: disc; }
        .atomic-md-ol { list-style: decimal; }
        .atomic-md-ul li, .atomic-md-ol li { margin: 0.12rem 0; }
        .atomic-md-code {
          font-size: 0.85em;
          background: rgba(0, 0, 0, 0.06);
          padding: 0.1em 0.35em;
          border-radius: 0.25rem;
          font-family: ui-monospace, monospace;
        }
        .atomic-md-link { color: #2563eb; text-decoration: underline; }
        .atomic-md-link:hover { color: #1d4ed8; }
        .atomic-md-spacer { height: 0.35rem; }
      `}</style>
      {open && (
        <div className="w-[min(360px,calc(100vw-2rem))] h-[420px] rounded-2xl border border-gray-200 bg-white shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b bg-gray-50 text-sm font-semibold text-gray-900">
            Chat with us
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 text-sm">
            {configReady && error ? (
              <p className="text-red-600 text-xs">{error}</p>
            ) : null}
            {chatActive || !configReady ? (
              <div className="text-gray-500 text-xs">{welcome}</div>
            ) : null}
            {!configReady && (
              <div className="mr-8 rounded-lg bg-gray-100 px-4 py-3 flex items-center gap-1.5">
                <span className="atomic-typing-dot" style={{ animationDelay: "0ms" }} />
                <span className="atomic-typing-dot" style={{ animationDelay: "150ms" }} />
                <span className="atomic-typing-dot" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 rounded-lg bg-blue-600 text-white px-3 py-2"
                    : "mr-8 rounded-lg bg-gray-100 text-gray-900 px-3 py-2"
                }
              >
                {m.role === "assistant" ? (
                  <ChatMarkdown content={m.content} />
                ) : (
                  m.content
                )}
              </div>
            ))}
            {loading && (
              <div
                className="mr-8 rounded-lg bg-gray-100 px-4 py-3 flex items-center gap-1.5"
                aria-live="polite"
                aria-label="Assistant is typing"
              >
                <span className="atomic-typing-dot" style={{ animationDelay: "0ms" }} />
                <span className="atomic-typing-dot" style={{ animationDelay: "150ms" }} />
                <span className="atomic-typing-dot" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            {error && chatActive && <p className="text-red-600 text-xs">{error}</p>}
            <div ref={bottomRef} />
          </div>
          <div className="border-t p-2 flex gap-2">
            <input
              className="flex-1 rounded-lg border px-3 py-2 text-black text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && canSend && sendMessage()}
              disabled={!canSend}
            />
            <button
              type="button"
              className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium disabled:opacity-50"
              onClick={sendMessage}
              disabled={!canSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        aria-label="Open chat"
        className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 text-xl"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
