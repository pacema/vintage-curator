import type { ProductCardContent } from "@/app/components/ProductCard";

export type MuratItem = { id: string } & ProductCardContent;

export type MuratSection = {
  category: string;
  headline: string | null;
  tagline: string | null;
  items: MuratItem[];
};

/** Placeholder copy and images — swap `imageUrl` to your JPG/PNG paths in /public when ready. */
export const MURAT_SECTIONS: MuratSection[] = [
  {
    category: "Editorial",
    headline: "Murat Ackman",
    tagline:
      "A fixed editorial selection — swap images and copy in lib/murat-static.ts anytime.",
    items: [
      {
        id: "m1",
        imageUrl: "/murat-product-1.svg",
        title: "Silk botanical camp shirt",
        priceLabel: "$148",
        size: "L",
        era: "1990s",
        source: "Archive",
        curatorNote:
          "Painterly florals on washed silk — easy with tailored trousers or denim.",
      },
      {
        id: "m2",
        imageUrl: "/murat-product-2.svg",
        title: "Wool herringbone blazer",
        priceLabel: "$210",
        size: "M",
        era: "1980s",
        source: "Studio",
        curatorNote:
          "Soft shoulder and narrow lapel — the kind of piece that elevates everything else you own.",
      },
      {
        id: "m3",
        imageUrl: "/murat-product-3.svg",
        title: "Leather penny loafers",
        priceLabel: "$175",
        size: "9",
        era: "1970s",
        source: "Collection",
        curatorNote:
          "Patina-forward leather with a slim toe — wear barefoot until they memorize your step.",
      },
    ],
  },
];
