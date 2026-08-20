"use client";

import { useEffect, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceId, deviceHeaders } from "@/hooks/use-device-id";
import { cn } from "@/lib/utils";

// ===== ProjectLikeButton =====
// Heart button that lets a visitor like the currently-active project.
// 1 like per device (X-Device-Id fingerprint + unique DB constraint).
// Toggle behavior: click to like, click again to unlike.

interface ProjectLikeButtonProps {
  projectSlug: string;
  projectName: string;
}

interface LikeState {
  count: number;
  liked: boolean;
  loading: boolean;
}

export function ProjectLikeButton({ projectSlug, projectName }: ProjectLikeButtonProps) {
  const deviceId = useDeviceId();
  const [state, setState] = useState<LikeState>({ count: 0, liked: false, loading: true });
  const [pulse, setPulse] = useState(false);

  const fetchState = useCallback(async () => {
    if (!deviceId || !projectSlug) return;
    setState((s) => ({ ...s, loading: true }));
    try {
      const res = await fetch(`/api/likes?project=${encodeURIComponent(projectSlug)}`, {
        headers: deviceHeaders(deviceId),
      });
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      setState({ count: data.count ?? 0, liked: !!data.liked, loading: false });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, [deviceId, projectSlug]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const toggleLike = useCallback(async () => {
    if (!deviceId || state.loading) return;
    const prev = state;
    const optimisticLiked = !state.liked;
    const optimisticCount = state.count + (optimisticLiked ? 1 : -1);
    setState({ count: optimisticCount, liked: optimisticLiked, loading: false });
    if (optimisticLiked) {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...deviceHeaders(deviceId) },
        body: JSON.stringify({ project: projectSlug }),
      });
      if (!res.ok) throw new Error("toggle failed");
      const data = await res.json();
      setState({ count: data.count ?? 0, liked: !!data.liked, loading: false });
    } catch {
      setState(prev);
    }
  }, [deviceId, projectSlug, state]);

  return (
    <button
      onClick={toggleLike}
      disabled={state.loading}
      aria-label={state.liked ? `Unlike ${projectName}` : `Like ${projectName}`}
      title={state.liked ? "You liked this — click to unlike" : "Like this project"}
      data-cursor="pointer"
      data-cursor-text={state.liked ? "♥" : "like"}
      className={cn(
        "group inline-flex h-9 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-all duration-200",
        state.liked
          ? "border-pink-500/40 bg-pink-500/10 text-pink-600 dark:text-pink-400"
          : "border-border bg-background/50 text-muted-foreground hover:border-pink-500/30 hover:text-pink-500",
        state.loading && "animate-pulse opacity-60"
      )}
    >
      <motion.span
        animate={pulse ? { scale: [1, 1.4, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex"
      >
        <Heart className={cn("h-3.5 w-3.5 transition-colors", state.liked && "fill-pink-500 text-pink-500")} />
      </motion.span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state.count}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="tabular-nums"
        >
          {state.count}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
