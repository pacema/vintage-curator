export type ProductCardContent = {
  imageUrl: string | null;
  title: string;
  priceLabel: string;
  size?: string | null;
  era?: string | null;
  source?: string | null;
  curatorNote?: string | null;
  staffPick?: boolean;
  staffPickName?: string | null;
  staffPickNote?: string | null;
};

type ProductCardProps = {
  id: string;
  content: ProductCardContent;
  interactive: boolean;
  href?: string;
  /** Teal frame matches Murat editorial cards on site background. */
  frame?: "default" | "teal";
};

export function ProductCard({
  id,
  content,
  interactive,
  href,
  frame = "default",
}: ProductCardProps) {
  const {
    imageUrl,
    title,
    priceLabel,
    size,
    era,
    source,
    curatorNote,
    staffPick,
    staffPickName,
    staffPickNote,
  } = content;

  const shellClass =
    "group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#D8E3E8]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#21524a]";

  const frameClass =
    frame === "teal"
      ? "border border-[#21524a]"
      : "border border-stone-200/90";

  const article = (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-sm bg-[#faf8f4] shadow-[0_1px_0_rgba(28,25,23,0.06)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-20px_rgba(28,25,23,0.25)] ${frameClass}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200">
        {staffPick || staffPickName || staffPickNote ? (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            <span className="bg-stone-900 px-2 py-1 font-sans text-[10px] font-medium tracking-[0.14em] text-stone-100 uppercase">
              ★ {`${staffPickName ?? "Staff"}'s Pick`}
            </span>
            {staffPickNote ? (
              <span className="max-w-[180px] bg-stone-900/80 px-2 py-1 font-sans text-[10px] leading-relaxed text-stone-100">
                {staffPickNote}
              </span>
            ) : null}
          </div>
        ) : null}
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
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
          {era ? (
            <span className="rounded-sm border border-stone-300/80 bg-stone-100/80 px-2 py-0.5 font-sans text-[10px] font-medium tracking-[0.14em] text-stone-600 uppercase">
              {era}
            </span>
          ) : null}
          {source ? (
            <span className="rounded-sm border border-stone-200 bg-white/80 px-2 py-0.5 font-sans text-[10px] tracking-[0.12em] text-stone-500 uppercase">
              {source}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <h2
            className={`font-sans text-lg font-medium leading-snug tracking-tight text-stone-900 underline-offset-4 ${
              interactive
                ? "decoration-stone-400/0 transition-colors group-hover:decoration-stone-500/80 group-hover:underline"
                : ""
            }`}
          >
            {title}
          </h2>
          <p className="font-sans text-sm text-stone-600">
            <span className="font-medium text-stone-800">{priceLabel}</span>
            {size ? (
              <span className="text-stone-400">
                {" "}
                · Size {size}
              </span>
            ) : null}
          </p>
        </div>

        {curatorNote ? (
          <blockquote className="border-l-2 border-stone-300/90 pl-4 [font-family:var(--font-editorial)] text-base leading-relaxed font-medium italic text-stone-600">
            {curatorNote}
          </blockquote>
        ) : null}

        <div className="mt-auto border-t border-stone-200/80 pt-4">
          <span
            className={`flex w-full items-center justify-center rounded-sm border border-stone-800 bg-stone-900 py-2.5 font-sans text-[11px] font-medium tracking-[0.14em] text-stone-100 uppercase transition-colors ${
              interactive ? "group-hover:bg-stone-800" : ""
            }`}
          >
            Visit Website
          </span>
        </div>
      </div>
    </article>
  );

  if (interactive && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={shellClass}
      >
        {article}
      </a>
    );
  }

  return (
    <div className={shellClass} role="group" aria-label={title}>
      {article}
    </div>
  );
}
