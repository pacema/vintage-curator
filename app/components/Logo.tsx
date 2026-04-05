import fs from "node:fs";
import path from "node:path";

const LOGO_CANDIDATES = [
  "vclogo.svg",
  "logo.svg",
  "logo.png",
  "logo.webp",
  "vintage-curator-logo.svg",
  "vintage-curator-logo.png",
] as const;

function resolvePublicLogoSrc(): string | null {
  const dir = path.join(process.cwd(), "public");
  for (const name of LOGO_CANDIDATES) {
    try {
      if (fs.existsSync(path.join(dir, name))) return `/${name}`;
    } catch {
      return null;
    }
  }
  return null;
}

function FallbackMark() {
  return (
    <svg
      className="h-9 w-9 shrink-0 md:h-10 md:w-10"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 4c-2.8 0-5 2.2-5 5v1.2c0 .5.2 1 .5 1.4l1.3 1.6H8.5c-.6 0-1.1.4-1.3 1l-2 6.5c-.1.3 0 .6.2.9.2.2.5.4.8.4h28.6c.3 0 .6-.2.8-.4.2-.3.3-.6.2-.9l-2-6.5c-.2-.6-.7-1-1.3-1h-8.3l1.3-1.6c.3-.4.5-.9.5-1.4V9c0-2.8-2.2-5-5-5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M12 26v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo() {
  const src = resolvePublicLogoSrc();

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local public asset, dynamic path
      <img
        src={src}
        alt=""
        width={200}
        height={48}
        className="h-9 w-auto max-w-[min(100%,12rem)] shrink-0 object-contain object-left md:h-10"
      />
    );
  }

  return <FallbackMark />;
}
