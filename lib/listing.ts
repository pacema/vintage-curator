export type Listing = {
  id: string;
  title: string | null;
  price: number | string | null;
  size: string | null;
  condition: string | null;
  era: string | null;
  imageUrl: string | null;
  listingUrl: string | null;
  source: string | null;
  category: string | null;
  aiCuratorNote: string | null;
  aiStyleTags: string[];
  featured: boolean;
};
