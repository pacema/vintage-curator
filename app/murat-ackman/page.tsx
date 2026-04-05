import type { Metadata } from "next";
import { SiteHeader } from "@/app/components/SiteHeader";
import { ProductCard } from "@/app/components/ProductCard";
import { MURAT_SECTIONS } from "@/lib/murat-static";

export const metadata: Metadata = {
  title: "Murat Ackman | VintageCurator",
  description:
    "Irresistible vintage fashion curated by expert vintage stylists.",
};

export default function MuratAckmanPage() {
  return (
    <div className="min-h-full flex flex-col bg-[#2a7267] text-[#D8E3E8]">
      <SiteHeader active="murat" />

      <main className="flex w-full flex-1 flex-col">
        <div className="mx-auto w-full max-w-7xl px-5 pt-12 md:px-10 md:pt-16" />

        <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
          <div className="relative aspect-[1920/1080] w-full overflow-hidden rounded-sm bg-stone-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/murat-hero.png"
              alt=""
              className="absolute inset-0 m-0 size-full border-0 object-cover p-0"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16">
          {MURAT_SECTIONS.map((section) => (
            <section key={section.category} className="mb-16 last:mb-0">
              {section.headline || section.tagline ? (
                <div className="mb-10 max-w-2xl">
                  {section.headline ? (
                    <h2 className="mb-3 font-sans text-[2.8125rem] font-medium leading-tight tracking-tight text-[#D8E3E8]">
                      {section.headline}
                    </h2>
                  ) : null}
                  {section.tagline ? (
                    <p className="font-sans text-base leading-relaxed text-[#D8E3E8]">
                      {section.tagline}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
                {section.items.map(({ id, ...content }) => (
                  <li key={id} className="list-none">
                    <ProductCard
                      id={id}
                      content={content}
                      interactive={false}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
