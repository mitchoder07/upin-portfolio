import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ===== Anonymous Chat Wall API =====
// GET /api/messages  → returns all messages newer than 30 days, newest first
// POST /api/messages { content, nickname? }  → adds a new message
//
// Messages auto-evaporate after 30 days:
//   • Reads filter by createdAt >= (now - 30 days) so expired messages
//     are never shown to anyone.
//   • A cleanup pass on each POST deletes messages older than 30 days
//     so the database doesn't grow forever.

const MAX_CONTENT_LENGTH = 280;
const MAX_NICKNAME_LENGTH = 24;
const TTL_DAYS = 30;
const RATE_LIMIT_WINDOW_MS = 60_000; // 60 seconds
const RATE_LIMIT_MAX_POSTS = 3; // 3 posts per minute per device

// Tiny profanity filter — replace obvious slurs with asterisks.
const PROFANITY = [
  "fuck", "shit", "bitch", "asshole", "bastard", "dick", "pussy", "cunt",
  "nigger", "nigga", "faggot", "retard", "whore", "slut",
];
function censor(s: string): string {
  let out = s;
  for (const word of PROFANITY) {
    const re = new RegExp(word, "gi");
    out = out.replace(re, (m) => "*".repeat(m.length));
  }
  return out;
}

function getDeviceId(req: NextRequest): string | null {
  const fromHeader = req.headers.get("x-device-id");
  if (fromHeader && /^[a-f0-9-]{20,60}$/i.test(fromHeader)) return fromHeader;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  return `fallback-${ip}-${ua}`.slice(0, 60);
}

function anonymousLabel(id: string): string {
  const tail = id.replace(/[^a-z0-9]/gi, "").slice(-4);
  return `Anonymous ${tail.toUpperCase()}`;
}

export async function GET() {
  try {
    const cutoff = new Date(Date.now() - TTL_DAYS * 24 * 60 * 60 * 1000);
    const messages = await db.chatMessage.findMany({
      where: { createdAt: { gte: cutoff } },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({
      messages: messages.map((m) => ({
        id: m.id,
        content: m.content,
        nickname: m.nickname || anonymousLabel(m.id),
        createdAt: m.createdAt.toISOString(),
        expiresAt: new Date(
          m.createdAt.getTime() + TTL_DAYS * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),
      ttlDays: TTL_DAYS,
    });
  } catch (err) {
    console.error("[messages GET] error:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawContent = typeof body?.content === "string" ? body.content : "";
    const rawNickname = typeof body?.nickname === "string" ? body.nickname.trim() : "";

    const content = rawContent.trim().slice(0, MAX_CONTENT_LENGTH);
    if (!content) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }
    const nickname = rawNickname ? rawNickname.slice(0, MAX_NICKNAME_LENGTH) : null;

    const deviceId = getDeviceId(req);
    const rateCutoff = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
    const recentCount = deviceId
      ? await db.chatMessage.count({
          where: { createdAt: { gte: rateCutoff }, deviceId },
        })
      : 0;
    if (recentCount >= RATE_LIMIT_MAX_POSTS) {
      return NextResponse.json(
        { error: "Slow down, speedster. Try again in a minute." },
        { status: 429 }
      );
    }

    const created = await db.chatMessage.create({
      data: {
        content: censor(content),
        nickname,
        deviceId: deviceId || "no-fingerprint",
      },
    });

    // Cleanup expired messages (housekeeping).
    const ttlCutoff = new Date(Date.now() - TTL_DAYS * 24 * 60 * 60 * 1000);
    db.chatMessage.deleteMany({ where: { createdAt: { lt: ttlCutoff } } }).catch(() => {});

    return NextResponse.json({
      message: {
        id: created.id,
        content: created.content,
        nickname: created.nickname || anonymousLabel(created.id),
        createdAt: created.createdAt.toISOString(),
        expiresAt: new Date(
          created.createdAt.getTime() + TTL_DAYS * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    });
  } catch (err) {
    console.error("[messages POST] error:", err);
    return NextResponse.json({ error: "Failed to post message" }, { status: 500 });
  }
}
