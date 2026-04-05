import { headers } from "next/headers";
import type { Listing } from "@/lib/listing";
import { Logo } from "./components/Logo";

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
      <header className="shrink-0 border-b border-stone-200 bg-white px-5 py-5 md:px-10 md:py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="flex items-center gap-3 text-neutral-900 md:gap-4">
            <Logo />
            <h1 className="font-sans text-lg font-medium tracking-[0.2em] uppercase">
              VintageCurator
            </h1>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-neutral-900 md:text-right">
            Irresistible vintage fashion curated by expert vintage stylists
          </p>
        </div>
      </header>

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
                {items.map((listing) => {
                  const href = listing.listingUrl ?? "#";
                  const note = listing.aiCuratorNote;

                  return (
                    <li key={listing.id} className="list-none">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#D8E3E8]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a7267]"
                      >
                        <article className="flex h-full flex-col overflow-hidden rounded-sm border border-stone-200/90 bg-[#faf8f4] shadow-[0_1px_0_rgba(28,25,23,0.06)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-20px_rgba(28,25,23,0.25)]">
                          <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200">
                            {listing.staffPick ? (
                              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                                <span className="bg-stone-900 px-2 py-1 font-sans text-[10px] font-medium tracking-[0.14em] text-stone-100 uppercase">
                                  ★ {`${listing.staffPickName ?? "Staff"}'s Pick`}
                                </span>
                                {listing.staffPickNote ? (
                                  <span className="max-w-[180px] bg-stone-900/80 px-2 py-1 font-sans text-[10px] leading-relaxed text-stone-100">
                                    {listing.staffPickNote}
                                  </span>
                                ) : null}
                              </div>
                            ) : null}
                            {listing.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={listing.imageUrl}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-sans text-xs tracking-wide text-stone-400 uppercase">
                                No image
                              </div>
                            )}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent opacity-60" />
                          </div>

                          <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                            <div className="flex flex-wrap items-center gap-2">
                              {listing.era ? (
                                <span className="rounded-sm border border-stone-300/80 bg-stone-100/80 px-2 py-0.5 font-sans text-[10px] font-medium tracking-[0.14em] text-stone-600 uppercase">
                                  {listing.era}
                                </span>
                              ) : null}
                              {listing.source ? (
                                <span className="rounded-sm border border-stone-200 bg-white/80 px-2 py-0.5 font-sans text-[10px] tracking-[0.12em] text-stone-500 uppercase">
                                  {listing.source}
                                </span>
                              ) : null}
                            </div>

                            <div className="flex flex-col gap-1">
                              <h2 className="font-sans text-lg font-medium leading-snug tracking-tight text-stone-900 decoration-stone-400/0 underline-offset-4 transition-colors group-hover:decoration-stone-500/80 group-hover:underline">
                                {listing.title ?? "Untitled"}
                              </h2>
                              <p className="font-sans text-sm text-stone-600">
                                <span className="font-medium text-stone-800">
                                  {formatPrice(listing.price)}
                                </span>
                                {listing.size ? (
                                  <span className="text-stone-400">
                                    {" "}
                                    · Size {listing.size}
                                  </span>
                                ) : null}
                              </p>
                            </div>

                            {note ? (
                              <blockquote className="border-l-2 border-stone-300/90 pl-4 [font-family:var(--font-editorial)] text-base leading-relaxed font-medium italic text-stone-600">
                                {note}
                              </blockquote>
                            ) : null}

                            <div className="mt-auto border-t border-stone-200/80 pt-4">
                              <span className="flex w-full items-center justify-center rounded-sm border border-stone-800 bg-stone-900 py-2.5 font-sans text-[11px] font-medium tracking-[0.14em] text-stone-100 uppercase transition-colors group-hover:bg-stone-800">
                                Visit Website
                              </span>
                            </div>
                          </div>
                        </article>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
        </div>
      </main>
    </div>
  );
}
