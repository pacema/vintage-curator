import type { Metadata } from "next";
import { headers } from "next/headers";
import type { Listing } from "@/lib/listing";
import { SiteHeader } from "@/app/components/SiteHeader";
import { ProductCard } from "@/app/components/ProductCard";

export const metadata: Metadata = {
  title: "Shea Finn | VintageCurator",
  description:
    "Irresistible vintage fashion curated by expert vintage stylists.",
};

type ApiOk = { listings: Listing[] };
type ApiErr = { error: string; detail?: string };

function formatPrice(price: Listing["price"]): string {
  if (price == null) return "—";
  if (typeof price === "number")
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  return price;
}

function groupListingsByCategory(listings: Listing[]): {
  category: string;
  items: Listing[];
}[] {
  const map = new Map<string, Listing[]>();

  for (const listing of listings) {
    const key = listing.category ?? "Other";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(listing);
  }

  const categories = [...map.keys()].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );

  return categories.map((category) => ({
    category,
    items: map.get(category)!,
  }));
}

function collectionHeaderForGroup(items: Listing[]) {
  const headline =
    items.find((l) => l.collectionHeadline)?.collectionHeadline ?? null;
  const tagline =
    items.find((l) => l.collectionTagline)?.collectionTagline ?? null;
  return { headline, tagline };
}

async function getListings(): Promise<{
  listings: Listing[];
  error: string | null;
}> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (!host) {
    return { listings: [], error: "Could not resolve request host." };
  }

  const base = `${proto}://${host}`;
  const res = await fetch(new URL("/api/listings", base), { cache: "no-store" });

  const json = (await res.json()) as ApiOk | ApiErr;

  if (!res.ok) {
    const err = "error" in json ? json.error : "Failed to load listings.";
    const detail = "detail" in json ? json.detail : undefined;
    return {
      listings: [],
      error: detail ? `${err} ${detail}` : err,
    };
  }

  if (!("listings" in json)) {
    return { listings: [], error: "Unexpected response from API." };
  }

  return { listings: json.listings, error: null };
}

export default async function Home() {
  const { listings, error } = await getListings();

  return (
    <div className="min-h-full flex flex-col bg-[#2a7267] text-[#D8E3E8]">
      <SiteHeader active="shea" />

      <main className="flex w-full flex-1 flex-col">
        <div className="mx-auto w-full max-w-7xl px-5 pt-12 md:px-10 md:pt-16">
          {error ? (
            <div
              className="rounded-sm border border-[#D8E3E8]/35 bg-[#D8E3E8]/10 px-5 py-4 font-sans text-sm text-[#D8E3E8]"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          {!error && listings.length === 0 ? (
            <p className="font-sans text-sm text-[#D8E3E8]">
              No listings yet. Add rows to your Airtable &ldquo;Listings&rdquo;
              table to see them here.
            </p>
          ) : null}
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
          <div className="relative aspect-[1920/1080] w-full overflow-hidden rounded-sm bg-stone-950">
            <iframe
              src="https://share.synthesia.io/embeds/videos/26ca9528-34ac-4c9f-a70c-a4d0e47ee228"
              loading="lazy"
              title="Synthesia video player - Unlocking Vintage Fashion: Find Unique Pieces Without Breaking the Bank"
              allowFullScreen
              allow="encrypted-media; fullscreen; microphone; screen-wake-lock;"
              className="absolute inset-0 m-0 size-full border-0 p-0"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16">
          {groupListingsByCategory(listings).map(({ category, items }) => {
            const { headline, tagline } = collectionHeaderForGroup(items);

            return (
              <section key={category} className="mb-16 last:mb-0">
                {headline || tagline ? (
                  <div className="mb-10 max-w-2xl">
                    {headline ? (
                      <h2 className="mb-3 font-sans text-[2.8125rem] font-medium leading-tight tracking-tight text-[#D8E3E8]">
                        {headline}
                      </h2>
                    ) : null}
                    {tagline ? (
                      <p className="font-sans text-base leading-relaxed text-[#D8E3E8]">
                        {tagline}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
                  {items.map((listing) => (
                    <li key={listing.id} className="list-none">
                      <ProductCard
                        id={listing.id}
                        interactive
                        href={listing.listingUrl ?? "#"}
                        content={{
                          imageUrl: listing.imageUrl,
                          title: listing.title ?? "Untitled",
                          priceLabel: formatPrice(listing.price),
                          size: listing.size,
                          era: listing.era,
                          source: listing.source,
                          curatorNote: listing.aiCuratorNote,
                          staffPick: listing.staffPick,
                          staffPickName: listing.staffPickName,
                          staffPickNote: listing.staffPickNote,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
