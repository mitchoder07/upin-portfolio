"use client";

import { useEffect, useState } from "react";

// ===== useDeviceId =====
// Returns a stable per-device fingerprint stored in localStorage.
//
// The first time this hook runs on a given browser, it generates a
// fresh UUIDv4 and saves it to localStorage under "upin:device-id".
// On subsequent visits (same browser, same device, even after a
// restart), it reads back the same ID. This is what gives the
// "1 like per device" behavior on the likes API and the per-device
// rate limit on the messages API.

const STORAGE_KEY = "upin:device-id";

function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback: RFC4122 v4 UUID using Math.random.
  const hex = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      out += "-";
    } else if (i === 14) {
      out += "4";
    } else if (i === 19) {
      out += hex[(Math.random() * 4) | 0 | 8];
    } else {
      out += hex[(Math.random() * 16) | 0];
    }
  }
  return out;
}

export function useDeviceId(): string | null {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    try {
      let id = localStorage.getItem(STORAGE_KEY);
      if (!id) {
        id = generateUuid();
        localStorage.setItem(STORAGE_KEY, id);
      }
      setDeviceId(id);
    } catch {
      const sessionId = generateUuid();
      setDeviceId(sessionId);
    }
  }, []);

  return deviceId;
}

export function deviceHeaders(deviceId: string | null): HeadersInit {
  return deviceId ? { "X-Device-Id": deviceId } : {};
}
