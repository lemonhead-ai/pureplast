export type MetricStatus = "verified" | "pending";

export interface ImpactMetric {
  label: string;
  value?: string;
  unit?: string;
  status: MetricStatus;
  collectionNote?: string;
}

export interface Certification {
  label: string;
  sub: string;
  status: "verified" | "in_progress" | "target";
}

export interface TeamMember {
  name?: string;
  role: string;
  status: "verified" | "pending";
}

export interface ClientLogo {
  name: string;
  imageUrl: string;
}

/** Path under public/ when the ESG PDF is ready — do not create a placeholder file. */
export const ESG_REPORT_PATH = "/documents/pureplast-esg-report.pdf";

export const SUSTAINABILITY_METRICS: Record<string, ImpactMetric> = {
  recycledTonnes: {
    label: "Plastic waste diverted",
    value: "5,000",
    unit: "tonnes",
    status: "verified",
  },
  recycledFeedstock: {
    label: "% recycled feedstock",
    status: "pending",
    collectionNote: "Company-wide % recycled vs virgin feedstock",
  },
  treesPlanted: {
    label: "Trees planted",
    status: "pending",
    collectionNote: "Tree planting: location, species, quantity, verification partner",
  },
  carbonOffset: {
    label: "CO₂ offset",
    status: "pending",
    collectionNote: "CO₂ offset methodology and totals",
  },
};

export const DATA_COLLECTION_CHECKLIST = [
  "Company-wide % recycled vs virgin feedstock",
  "Tree planting: location, species, quantity, verification partner",
  "CO₂ offset methodology and totals",
  "ISO 14001 / recycled content standard timeline",
  "ESG data sheet PDF for procurement",
  "Team photos and names for About section",
  "Client logos (with permission)",
  "Per-product recycled % for catalog backfill",
];

export const SUSTAINABILITY_PILLARS = [
  {
    id: "recycled-materials",
    title: "Recycled Materials",
    description:
      "We source post-consumer and industrial recycled plastics where material performance allows. Recycled feedstock reduces virgin polymer demand without compromising structural integrity on approved product lines.",
  },
  {
    id: "carbon-offset",
    title: "Carbon Offset",
    description:
      "We are building verifiable offset programmes — including regional tree planting — to balance the footprint of energy we cannot yet eliminate from our manufacturing process.",
  },
  {
    id: "manufacturing-practices",
    title: "Manufacturing Practices",
    description:
      "Our Kitengela facility recycles manufacturing scrap in closed loops where feasible. We use virgin polymer where specifications require it — particularly on engineered lines — and we are working toward internationally recognised environmental management standards.",
  },
];

export const VERIFIED_CERTIFICATIONS: Certification[] = [
  { label: "KEBS Certified", sub: "Kenya Bureau of Standards", status: "verified" },
  { label: "BPA-Free Production", sub: "Consumer product lines — see product credentials", status: "verified" },
  { label: "Food-Safe Materials", sub: "Kitchen lines — available on request for engineered parts", status: "verified" },
];

export const TARGET_CERTIFICATIONS: Certification[] = [
  { label: "ISO 14001", sub: "Environmental management — target certification", status: "target" },
  { label: "Recycled Content Standards", sub: "Third-party verification of feedstock claims", status: "in_progress" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { role: "Operations Lead", status: "pending" },
  { role: "Production Manager", status: "pending" },
  { role: "Quality & Compliance", status: "pending" },
];

export const CLIENT_LOGOS: ClientLogo[] = [];

export const SUSTAINABILITY_STORY = {
  headline: "Why sustainability matters to PurePlast",
  body: [
    "PurePlast was built in Kitengela because manufacturing should happen close to the markets it serves — not because sustainability was an afterthought.",
    "Plastic waste is a visible problem across East Africa. We chose to make recycled feedstock a core input where material performance allows, because diverting waste from landfill is an operational decision — not a marketing line.",
    "We still run standard injection moulding and use virgin polymer where specifications require it. We are on a journey toward fuller sustainability, and we publish only what we can verify.",
  ],
};

export function getVerifiedTonnesDisplay(): string {
  const metric = SUSTAINABILITY_METRICS.recycledTonnes;
  if (metric.status !== "verified" || !metric.value) return "";
  return `${metric.value} ${metric.unit ?? "tonnes"}`;
}

export function getFooterSustainabilityStat(): string {
  const metric = SUSTAINABILITY_METRICS.recycledTonnes;
  if (metric.status !== "verified" || !metric.value) return "";
  return `${metric.value} ${metric.unit ?? "tonnes"} plastic waste diverted`;
}

export function isEsgReportAvailable(): boolean {
  // Flip to true once the PDF is placed at public/documents/pureplast-esg-report.pdf
  return false;
}
