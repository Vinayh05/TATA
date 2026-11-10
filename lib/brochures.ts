export interface Brochure {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  category: string;
  brochureUrl: string;
  fileName: string;
  fileSize: string;
  pageCount: number;
  badge?: string;
  description: string;
  keyHighlights: string[];
}

export const brochures: Brochure[] = [
  {
    slug: "tiago",
    name: "Tiago",
    title: "Next Gen Tiago",
    tagline: "It's Seriously Fun",
    category: "Hatchback",
    brochureUrl: "/brochures/tiago/next-gen-tiago-brochure-may.pdf",
    fileName: "next-gen-tiago-brochure-may.pdf",
    fileSize: "63.6 MB",
    pageCount: 28,
    badge: "Official Brochure",
    description:
      "Explore the Next Gen Tata Tiago with sporty exterior styling, premium dual-tone interiors, dynamic performance, and class-leading safety features.",
    keyHighlights: [
      "Dynamic Performance & Drive Modes",
      "GNCAP 4-Star Safety Rating Heritage",
      "Touchscreen Infotainment by HARMAN™",
      "Spacious Dual-Tone Premium Cabin",
    ],
  },
];

export function getAllBrochures(): Brochure[] {
  return brochures;
}

export function getBrochureBySlug(slug: string): Brochure | undefined {
  return brochures.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
}
