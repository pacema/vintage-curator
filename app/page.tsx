import { headers } from "next/headers";
import type { Listing } from "@/lib/listing";

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
    <div className="min-h-full flex flex-col bg-[#f3f0e8] text-stone-900">
      <header className="shrink-0 border-b border-stone-800 bg-[#141312] px-5 py-5 md:px-10 md:py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-6">
          <h1 className="font-sans text-lg font-medium tracking-[0.2em] text-stone-100 uppercase">
            VintageCurator
          </h1>
          <p className="max-w-md font-sans text-sm leading-relaxed text-stone-500 md:text-right">
            AI-curated vintage, sourced from the best
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-12 md:px-10 md:py-16">
        {error ? (
          <div
            className="rounded-sm border border-amber-200/80 bg-amber-50/90 px-5 py-4 font-sans text-sm text-amber-950"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        {!error && listings.length === 0 ? (
          <p className="font-sans text-sm text-stone-500">
            No listings yet. Add rows to your Airtable &ldquo;Listings&rdquo;
            table to see them here.
          </p>
        ) : null}

        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
          {listings.map((listing) => {
            const href = listing.listingUrl ?? "#";
            const note = listing.aiCuratorNote;

            return (
              <li key={listing.id} className="list-none">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f0e8]"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-sm border border-stone-200/90 bg-[#faf8f4] shadow-[0_1px_0_rgba(28,25,23,0.06)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-20px_rgba(28,25,23,0.25)]">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200">
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
                        <blockquote
                          className="mt-auto border-l-2 border-stone-300/90 pl-4 [font-family:var(--font-editorial)] text-base leading-relaxed font-medium italic text-stone-600"
                        >
                          {note}
                        </blockquote>
                      ) : null}
                    </div>
                  </article>
                </a>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
