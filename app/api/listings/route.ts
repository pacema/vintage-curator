import { NextResponse } from "next/server";
import type { Listing } from "@/lib/listing";

const LISTINGS_TABLE = "Listings";

function toStr(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "string") return v.trim() || null;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return null;
}

function toPrice(v: unknown): number | string | null {
  if (v == null) return null;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const t = v.trim();
    if (!t) return null;
    const n = Number(t.replace(/[^0-9.-]/g, ""));
    if (!Number.isNaN(n) && t.match(/^\s*\d/)) return n;
    return t;
  }
  return null;
}

function pickImageUrl(fields: Record<string, unknown>): string | null {
  const raw = fields.image_url ?? fields.Image;
  if (typeof raw === "string" && /^https?:\/\//i.test(raw)) return raw;
  if (Array.isArray(raw) && raw.length > 0) {
    const first = raw[0] as { url?: string };
    if (first?.url && typeof first.url === "string") return first.url;
  }
  return null;
}

function toStringArray(v: unknown): string[] {
  if (v == null) return [];
  if (Array.isArray(v))
    return v.filter((x): x is string => typeof x === "string");
  if (typeof v === "string") return v.trim() ? [v.trim()] : [];
  return [];
}

function toBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  return false;
}

/** Checkbox, yes/no text, or numeric flags from Airtable */
function toBoolLoose(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const t = v.trim().toLowerCase();
    return t === "yes" || t === "true" || t === "1";
  }
  return false;
}

/** Airtable uses your exact field names — try snake_case and common label variants */
function firstStr(
  fields: Record<string, unknown>,
  keys: string[],
): string | null {
  for (const k of keys) {
    const v = toStr(fields[k]);
    if (v) return v;
  }
  return null;
}

function mapRecord(record: {
  id: string;
  fields: Record<string, unknown>;
}): Listing {
  const f = record.fields;
  const staffPickName = firstStr(f, [
    "staff_pick_name",
    "Staff pick name",
    "Staff Pick Name",
  ]);
  const staffPickNote = firstStr(f, [
    "staff_pick_note",
    "Staff pick note",
    "Staff Pick Note",
  ]);
  const staffPick =
    toBoolLoose(f.staff_pick) ||
    toBoolLoose(f["Staff pick"]) ||
    toBoolLoose(f["Staff Pick"]) ||
    !!(staffPickName || staffPickNote);

  return {
    id: record.id,
    title: toStr(f.title),
    price: toPrice(f.price),
    size: toStr(f.size),
    condition: toStr(f.condition),
    era: toStr(f.era),
    imageUrl: pickImageUrl(f),
    listingUrl: (() => {
      const u = f.listing_url;
      if (typeof u === "string" && /^https?:\/\//i.test(u)) return u;
      return null;
    })(),
    source: toStr(f.source),
    category: toStr(f.category),
    aiCuratorNote: toStr(f.ai_curator_note),
    aiStyleTags: toStringArray(f.ai_style_tags),
    featured: toBool(f.featured),
    staffPick,
    staffPickName,
    staffPickNote,
    collectionHeadline: toStr(f.collection_headline),
    collectionTagline: toStr(f.collection_tagline),
  };
}
export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  console.log(
    "[listings] env:",
    "apiKey first 5:",
    apiKey ? apiKey.slice(0, 5) : "(none)",
    "baseId:",
    baseId ?? "(none)",
  );

  if (!apiKey || !baseId) {
    return NextResponse.json(
      { error: "Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID in environment." },
      { status: 500 },
    );
  }

  const url = new URL(
    `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(LISTINGS_TABLE)}`,
  );

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        {
          error: "Airtable request failed.",
          status: res.status,
          detail: detail.slice(0, 500),
        },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      records?: { id: string; fields: Record<string, unknown> }[];
    };

    const raw = data.records ?? [];
    const listings = raw.map(mapRecord).sort((a, b) => {
      if (a.featured === b.featured) return 0;
      return a.featured ? -1 : 1;
    });

    return NextResponse.json({ listings });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
