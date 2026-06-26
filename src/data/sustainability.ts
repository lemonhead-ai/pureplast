export type MetricStatus = "verified" | "pending";

export interface ImpactMetric {
  label: string;
  value?: string;       // only when verified
  unit?: string;
  status: MetricStatus;
  collectionNote?: string; // shown to admins / internal, not as fake data
}

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
  "Per-product recycled % for catalog backfill"
];

// Content for the Three Pillars
export const SUSTAINABILITY_PILLARS = [
  {
    id: "recycled-materials",
    title: "Recycled Materials",
    description: "We are committed to increasing our use of post-consumer and industrial recycled plastics. By reintroducing waste streams into our manufacturing process, we reduce the demand for virgin feedstock without compromising structural integrity or performance."
  },
  {
    id: "carbon-offset",
    title: "Carbon Offset",
    description: "Our operations are continuously evaluated for energy efficiency. We are establishing verifiable carbon offset programmes, including regional tree planting initiatives, to balance the carbon footprint of our unavoidable energy consumption."
  },
  {
    id: "manufacturing-practices",
    title: "Manufacturing Practices",
    description: "We operate a modern facility focused on reducing waste at the source. Our current state includes full closed-loop recycling of our own manufacturing scrap, alongside a roadmap to achieve internationally recognised environmental management standards."
  }
];
