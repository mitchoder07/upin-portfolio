import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ===== Project Likes API =====
// GET /api/likes?project=rafaab  → returns { count, likedByThisDevice } for one project
// GET /api/likes                  → returns { [projectSlug]: count } for all projects
// POST /api/likes { project }      → toggles a like for this device (adds if not present, removes if present)
//
// "Device" is identified by a fingerprint sent from the client in the
// `X-Device-Id` header. The client generates this ID once (UUIDv4) and
// stores it in localStorage forever, so the same browser on the same
// device always sends the same ID. This gives "1 like per device"
// behavior without requiring login, and the unique constraint on
// (projectSlug, deviceId) in the database makes it impossible to spam
// a second like from the same device.

function sanitizeSlug(s: unknown): string | null {
  if (typeof s !== "string") return null;
  const trimmed = s.trim().toLowerCase();
  if (!/^[a-z0-9-]{1,60}$/.test(trimmed)) return null;
  return trimmed;
}

function getDeviceId(req: NextRequest): string | null {
  const fromHeader = req.headers.get("x-device-id");
  if (fromHeader && /^[a-f0-9-]{20,60}$/i.test(fromHeader)) return fromHeader;
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const projectSlug = sanitizeSlug(req.nextUrl.searchParams.get("project"));
    const deviceId = getDeviceId(req);

    if (projectSlug) {
      const [count, myLike] = await Promise.all([
        db.projectLike.count({ where: { projectSlug } }),
        deviceId
          ? db.projectLike.findUnique({
              where: { projectSlug_deviceId: { projectSlug, deviceId } },
            })
          : null,
      ]);
      return NextResponse.json({ project: projectSlug, count, liked: !!myLike });
    }

    const grouped = await db.projectLike.groupBy({
      by: ["projectSlug"],
      _count: { _all: true },
    });
    const counts: Record<string, number> = {};
    for (const g of grouped) {
      counts[g.projectSlug] = g._count._all;
    }
    return NextResponse.json({ counts });
  } catch (err) {
    console.error("[likes GET] error:", err);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const projectSlug = sanitizeSlug(body?.project);
    const deviceId = getDeviceId(req);

    if (!projectSlug) {
      return NextResponse.json({ error: "Missing or invalid 'project' field" }, { status: 400 });
    }
    if (!deviceId) {
      return NextResponse.json(
        { error: "Missing X-Device-Id header. Set one on the client (UUID in localStorage)." },
        { status: 400 }
      );
    }

    const existing = await db.projectLike.findUnique({
      where: { projectSlug_deviceId: { projectSlug, deviceId } },
    });

    if (existing) {
      await db.projectLike.delete({ where: { id: existing.id } });
      const count = await db.projectLike.count({ where: { projectSlug } });
      return NextResponse.json({ project: projectSlug, liked: false, count });
    }

    await db.projectLike.create({ data: { projectSlug, deviceId } });
    const count = await db.projectLike.count({ where: { projectSlug } });
    return NextResponse.json({ project: projectSlug, liked: true, count });
  } catch (err) {
    console.error("[likes POST] error:", err);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
