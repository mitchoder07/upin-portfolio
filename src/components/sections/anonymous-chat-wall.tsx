"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Loader2 } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeviceId, deviceHeaders } from "@/hooks/use-device-id";

// ===== AnonymousChatWall =====
// Section where any visitor can drop a short anonymous note that
// everyone sees. Messages auto-evaporate after 30 days.

interface ChatMsg {
  id: string;
  content: string;
  nickname: string;
  createdAt: string;
  expiresAt: string;
}

const MAX_CONTENT = 280;
const MAX_NICKNAME = 24;

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const sec = Math.floor(diff / 1000);
  if (sec < 5) return "just now";
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  return "a while ago";
}

function daysUntil(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}

export function AnonymousChatWall() {
  const deviceId = useDeviceId();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/messages", { headers: deviceHeaders(deviceId) });
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      setMessages(data.messages ?? []);
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    fetchMessages();
    const id = setInterval(fetchMessages, 30_000);
    return () => clearInterval(id);
  }, [fetchMessages]);

  const submit = async () => {
    const trimmed = content.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...deviceHeaders(deviceId) },
        body: JSON.stringify({
          content: trimmed,
          nickname: nickname.trim() || undefined,
        }),
      });
      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Slow down, speedster.");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Couldn't post that. Try again.");
        return;
      }
      const data = await res.json();
      setMessages((prev) => [data.message, ...prev]);
      setContent("");
      inputRef.current?.focus();
    } catch {
      setError("Network hiccup. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <section id="wall" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          badge="Visitor wall"
          heading="Leave a note. It evaporates in 30 days."
          subheading="Anonymous. No login, no email, no tracking. Just say something kind, weird, or both. Messages auto-vanish after 30 days so the wall stays fresh."
        />

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl glass p-5 sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5 text-[var(--neon)]" />
            <span>your message will be tagged with a random nickname if you leave the name field blank</span>
          </div>
          <div className="mb-3 grid gap-2 sm:grid-cols-[140px_1fr]">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value.slice(0, MAX_NICKNAME))}
              placeholder="nickname (optional)"
              maxLength={MAX_NICKNAME}
              className="h-10 rounded-lg border border-border bg-background/60 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--neon)]/60 focus:outline-none"
            />
            <textarea
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, MAX_CONTENT))}
              onKeyDown={onKeyDown}
              placeholder="say something..."
              rows={2}
              maxLength={MAX_CONTENT}
              className="resize-none rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--neon)]/60 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground tabular-nums">
              {content.length}/{MAX_CONTENT}
            </div>
            <Button
              onClick={submit}
              disabled={submitting || !content.trim()}
              size="sm"
              className="h-9 rounded-full bg-foreground text-background hover:bg-foreground/90"
              data-cursor="pointer"
            >
              {submitting ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Send className="mr-2 h-3.5 w-3.5" />
              )}
              drop it
            </Button>
          </div>
          {error && (
            <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        <div className="mx-auto mt-8 max-w-2xl space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              loading the wall...
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-sm text-muted-foreground">
                the wall is empty. be the first to leave a mark.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, delay: i < 10 ? i * 0.02 : 0 }}
                  className={cn(
                    "rounded-2xl border border-border bg-background/40 p-4 backdrop-blur-sm",
                    i === 0 && "border-[var(--neon)]/30 bg-[var(--neon)]/5"
                  )}
                >
                  <div className="mb-1.5 flex items-baseline justify-between gap-2">
                    <span className="font-display text-sm font-semibold text-[var(--neon)]">
                      {m.nickname}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground tabular-nums">
                      {timeAgo(m.createdAt)} · vanishes in {daysUntil(m.expiresAt)}d
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 break-words whitespace-pre-wrap">
                    {m.content}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
