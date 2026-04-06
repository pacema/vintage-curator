import type { ProductCardContent } from "@/app/components/ProductCard";

export type MuratItem = { id: string } & ProductCardContent;

export type MuratSection = {
  category: string;
  headline: string | null;
  tagline: string | null;
  items: MuratItem[];
};

/**
 * Murat Ackman — static shoulder bag edit.
 * Images: /public/murat/01.png … 10.png (from editorial screenshots).
 */
export const MURAT_SECTIONS: MuratSection[] = [
  {
    category: "Shoulder bags",
    headline: "Murat Ackman's summer selection of shoulder bags",
    tagline:
      "These shoulder bags are my picks for traveling with just a little more flair.",
    items: [
      {
        id: "m1",
        imageUrl: "/murat/01.png",
        title:
          "Vintage Leather Men's Black Commuter Messenger Travel Shoulder Bag",
        priceLabel: "$29",
        size: "Medium",
        era: "1980S–1990S",
        source: "EBAY",
        curatorNote:
          "That utilitarian swagger of vintage leather—this unbranded messenger has the worn-in patina of a thousand commutes. Perfect for layering that casual-meets-intentional vibe, whether slung across your chest or held close. Timeless carry piece.",
      },
      {
        id: "m2",
        imageUrl: "/murat/02.png",
        title:
          "Vintage Polo Ralph Lauren Oiled Leather Canvas Messenger Black Briefcase Bag",
        priceLabel: "$183",
        size: "Medium",
        era: "1990S-2000S",
        source: "EBAY",
        curatorNote:
          "That perfect messenger bag that whispers 'I have my life together'—oiled leather, Ralph Lauren's golden era of utility-meets-luxury, ready to transition from desk to dinner without apology. Wear it slung across your chest for modern ease.",
      },
      {
        id: "m3",
        imageUrl: "/murat/03.png",
        title: "Men's Vintage Handmade Leather Shoulder Bag with Push Lock",
        priceLabel: "$35",
        size: "Medium",
        era: "1970S-1980S",
        source: "EBAY",
        curatorNote:
          "Handcrafted leather with real patina—this rustic shoulder bag reads vintage-authentic without trying. The push-lock closure is pure analog charm. Layer it with modern minimalist pieces or dress it up with tailored basics for that effortless heritage vibe.",
      },
      {
        id: "m4",
        imageUrl: "/murat/04.png",
        title:
          "Clark Men's Messenger Bag Leather Brown Briefcase Vintage 90's",
        priceLabel: "$50",
        size: "Not specified",
        era: "1990S",
        source: "EBAY",
        curatorNote:
          "That 90s minimal armor energy—Clark's leather messenger hits different. Brown leather that's aged with character, structured enough for the office, relaxed enough for weekend errands. Pair with tailored trousers or throw over vintage denim. Real leather, real longevity.",
      },
      {
        id: "m5",
        imageUrl: "/murat/05.png",
        title:
          "Ruitertassen Leather Shoulder Bag – Vintage Tan Brown, Belgian Professor",
        priceLabel: "$90",
        size: "Not specified",
        era: "1980S-1990S",
        source: "EBAY",
        curatorNote:
          "That perfect worn-in leather that only gets better with age. This Belgian-made Ruitertassen bag has serious professor credentials—the kind of piece that looks equally at home in a university office or slung across your chest at a weekend market. Warm, substantial, real.",
      },
      {
        id: "m6",
        imageUrl: "/murat/06.png",
        title:
          "Mens Vintage Leather Satchel Messenger Bag Crossbody Shoulder Brown Small Pouch",
        priceLabel: "$40",
        size: "Small",
        era: "1980S-1990S",
        source: "EBAY",
        curatorNote:
          "That worn-in brown leather whispers vintage cool. Small enough for essentials, structured enough for serious errands—the kind of bag that looks better every season. Sling it cross-body over oversized blazers or layer under parkas. Authentically lived-in.",
      },
      {
        id: "m7",
        imageUrl: "/murat/07.png",
        title:
          "Vintage Men's Leather Tan Camel Travel Messenger Shoulder Crossbody Bag",
        priceLabel: "$55",
        size: "Medium",
        era: "1990S-2000S",
        source: "EBAY",
        curatorNote:
          "That perfect worn-in leather messenger that feels like it's traveled the world. Camel tan develops character with age, making this crossbody ideal for anyone craving understated utility. Layer it over linen, pair with denim—this is the bag that just works.",
      },
      {
        id: "m8",
        imageUrl: "/murat/08.png",
        title:
          "Wilson's Leather Messenger Bag Distressed Leather Men Casual Workwear Vintage",
        priceLabel: "$31",
        size: "Not specified",
        era: "1990S-2000S",
        source: "EBAY",
        curatorNote:
          "That worn-in leather messenger from Wilson's—the kind that looks better with age. Perfect for the minimalist guy who wants substance over flash. Sling it over a linen shirt or structured blazer and you've got instant understated cool. This is workwear that actually works.",
      },
      {
        id: "m9",
        imageUrl: "/murat/09.png",
        title: "Vintage Eco City Small Canvas Messenger Shoulder Bag",
        priceLabel: "$20",
        size: "Small",
        era: "2000S-2010S",
        source: "EBAY",
        curatorNote:
          "Practical meets cool with this compact canvas messenger. The unstructured silhouette reads modern minimal, while that utilitarian vibe slots seamlessly into today's conscious dressing. Sling it crossbody for errands or layer it into any outfit that needs grounding.",
      },
      {
        id: "m10",
        imageUrl: "/murat/10.png",
        title: "Vintage Leather & Canvas Shoulder Bag",
        priceLabel: "$70",
        size: "Not specified",
        era: "1990S-2000S",
        source: "EBAY",
        curatorNote:
          "That sweet spot between utility and understated cool—leather mixed with canvas feels very 90s-forward. Throw it over your shoulder with oversized everything, or dress it up with something tailored. The worn-in patina is doing all the heavy lifting here.",
      },
    ],
  },
];
