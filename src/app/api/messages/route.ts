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

// Comprehensive profanity + illicit content filter.
// Replaces offensive words with asterisks (same length) so the
// structure of the message is preserved but the harmful content is
// redacted. Covers:
//   - Common profanity (English)
//   - Racial slurs
//   - Homophobic / ableist slurs
//   - Sexual explicit terms
//   - Drug-related slang
//   - Common leetspeak variants (a→@, i→1, e→3, o→0, s→$, etc.)
//   - Space-separated bypass attempts (f u c k → ****)
//
// This is NOT exhaustive — determined trolls will always find gaps —
// but it catches the vast majority of casual abuse. The 30-day TTL
// and the per-device rate limit are the real safety net.
const PROFANITY = [
  // Common profanity
  "fuck", "fucker", "fucking", "fucked", "fuckin", "motherfucker", "motherfucking",
  "shit", "shitty", "shite", "bullshit", "dipshit", "dumbshit",
  "bitch", "bitches", "bitching", "son of a bitch",
  "asshole", "assholes", "arsehole",
  "bastard", "bastards",
  "dick", "dickhead", "dickheads", "dicks",
  "pussy", "pussies",
  "cunt", "cunts",
  "cock", "cocks", "cock sucker", "cocksucker", "cocksuckers",
  "wanker", "wankers",
  "twat", "twats",
  "prick", "pricks",
  "slut", "sluts", "slutty",
  "whore", "whores",
  "hoe", "hoes",
  "skank", "skanks",
  "douche", "douchebag", "douchebags",
  "jackass", "jackasses",
  "dumbass", "dumbasses",
  "fatass", "lazyass",
  "dumbfuck", "dumbfucks",

  // Racial / ethnic slurs
  "nigger", "nigga", "niggers", "niggas",
  "spic", "spics",
  "chink", "chinks",
  "wetback", "wetbacks",
  "gook", "gooks",
  "kike", "kikes",
  "kraut", "krauts",
  "wop", "wops",
  "mick", "micks",
  "paki", "pakis",
  "raghead", "ragheads",
  "towelhead", "towelheads",
  "camel jockey", "camel jockeys",
  "spear chucker", "spear chuckers",

  // Homophobic / ableist slurs
  "faggot", "faggots", "fag", "fags", "fagg",
  "dyke", "dykes",
  "tranny", "trannies",
  "retard", "retards", "retarded",
  "mongoloid", "mongoloids",
  "spaz", "spazz", "spastic",
  "cripple", "cripples",
  "midget", "midgets",

  // Sexual explicit terms
  "porn", "porno", "pornography",
  "hentai",
  "milf", "milfs",
  "dildo", "dildos",
  "vibrator",
  "butt plug",
  "anal", "rimjob", "rimming",
  "boner",
  "jizz", "cum", "cumming",
  "bukkake",
  "gangbang", "gang bang",
  "creampie",
  "deepthroat", "deep throat",
  "handjob", "hand job",
  "blowjob", "blow job",
  "tit", "tits", "titty", "titties",
  "boob", "boobs", "boobies",
  "nipple", "nipples",
  "vagina", "vaginal",
  "penis",
  "ballsack", "ball sack",
  "nutsack", "nut sack",
  "clit", "clitoris",
  "fingering",
  "fisting",
  "orgasm",
  "masturbate", "masturbating", "masturbation",
  "moan", "moaning",

  // Drug-related slang
  "cocaine", "coke", "crack", "crackhead",
  "heroin", "meth", "crystal meth", "crystal",
  "weed", "marijuana", "pot", "ganja",
  "lsd", "ecstasy", "mdma",
  "shrooms", "mushrooms",
  "dealer", "drug dealer",
  "drug deal",
  "pill mill",

  // Violence / threats
  "kill yourself", "kys",
  "rape", "rapist", "raping",
  "molest", "molester", "molesting",
  "pedophile", "paedophile", "pedo",
  "child porn", "cp",
  "beheading", "decapitate",
  "shoot up", "shooting up",
  "bomb threat", "bombing",
  "terrorist", "terrorism",
  "jihad",
  "genocide", "ethnic cleansing",
  "lynch", "lynching",
  "hang yourself",
  "self harm", "cut yourself",

  // Leetspeak variants of common words (fuck, shit, etc.)
  "f@ck", "fuk", "fukk", "phuck", "phuk",
  "sh1t", "shyt", "sh!t",
  "b1tch", "b!tch",
  "@ss", "@sshole",
  "d!ck",
  "pu$$y",
  "cunt" ,
  "f4gg0t", "f4g",
  "r3t4rd",
  "n1gg4", "n!gg@",
  "5h1t",
  "b00b5",
  "d1ld0",

  // Bypass attempts with spaces
  "f u c k", "f.u.c.k", "f-u-c-k",
  "s h i t", "s.h.i.t", "s-h-i-t",
  "b i t c h", "b.i.t.c.h",
  "a s s h o l e", "a.s.s.h.o.l.e",
  "n i g g a", "n.i.g.g.a",
  "r e t a r d", "r.e.t.a.r.d",
];

// Build a single regex from the word list for efficient matching.
// Uses word boundaries (\\b) so "ass" doesn't match "class", and
// escapes regex special characters in the words.
const profanityRegex = (() => {
  const escaped = PROFANITY
    .filter((w) => w.length > 1)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");
})();

function censor(s: string): string {
  // First pass: catch whole-word matches with word boundaries.
  let out = s.replace(profanityRegex, (m) => "*".repeat(m.length));
  // Second pass: catch space-separated bypass attempts like "f u c k".
  // Collapse spaces and check against the word list, then redact the
  // original positions if a match is found.
  let collapsed = s.replace(/\s+/g, "").toLowerCase();
  for (const word of PROFANITY) {
    if (word.length < 4 || word.includes(" ")) continue; // skip short words and phrases
    const wordNoSpace = word.replace(/\s+/g, "");
    let idx = collapsed.indexOf(wordNoSpace);
    while (idx !== -1) {
      // Redact the corresponding characters in the original string
      // (accounting for the spaces that were collapsed).
      let origIdx = 0;
      let collapsedIdx = 0;
      while (collapsedIdx < idx && origIdx < out.length) {
        if (/\s/.test(s[origIdx])) {
          origIdx++;
        } else {
          collapsedIdx++;
          origIdx++;
        }
      }
      // Redact wordNoSpace.length non-space characters starting at origIdx
      let redacted = 0;
      let i = origIdx;
      while (i < out.length && redacted < wordNoSpace.length) {
        if (!/\s/.test(out[i])) {
          out = out.slice(0, i) + "*" + out.slice(i + 1);
          redacted++;
        }
        i++;
      }
      collapsed = collapsed.slice(0, idx) + "*".repeat(wordNoSpace.length) + collapsed.slice(idx + wordNoSpace.length);
      idx = collapsed.indexOf(wordNoSpace, idx + wordNoSpace.length);
    }
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
