import Link from "next/link";
import { Logo } from "./Logo";

export type SiteNavKey = "shea" | "murat";

export function SiteHeader({ active }: { active: SiteNavKey }) {
  const linkBase =
    "font-sans text-sm font-medium tracking-wide text-neutral-900 transition-opacity hover:opacity-70";
  const activeCls = "underline decoration-2 underline-offset-4";

  return (
    <header className="shrink-0 border-b border-stone-200 bg-white px-5 py-5 md:px-10 md:py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <div className="flex items-center gap-3 text-neutral-900 md:gap-4">
              <Logo />
              <h1 className="font-sans text-lg font-medium tracking-[0.2em] uppercase">
                VintageCurator
              </h1>
            </div>
            <nav
              className="flex flex-wrap items-center gap-6 border-stone-200 sm:border-l sm:pl-6"
              aria-label="Site sections"
            >
              <Link
                href="/"
                className={`${linkBase} ${active === "shea" ? activeCls : ""}`}
              >
                Shea Finn
              </Link>
              <Link
                href="/murat-ackman"
                className={`${linkBase} ${active === "murat" ? activeCls : ""}`}
              >
                Murat Ackman
              </Link>
            </nav>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-neutral-900 md:text-right">
            Irresistible vintage fashion curated by expert vintage stylists
          </p>
        </div>
      </div>
    </header>
  );
}
