/**
 * Launch-day sustainability data and commitments for PurePlast.
 * Every metric and statement is true on day one of factory launch.
 */

export interface MaterialGradeDefinition {
  grade: "VIRGIN" | "GR2" | "GR3";
  title: string;
  source: string;
  bestUsedFor: string;
  foodContactStatus: string;
  environmentalBenefit: string;
}

export const MATERIAL_GRADES: MaterialGradeDefinition[] = [
  {
    grade: "VIRGIN",
    title: "Prime Virgin Polymer",
    source: "First-run certified imported resin granules (PP, HDPE, LDPE, ABS)",
    bestUsedFor: "Tableware, institutional dining cups, high-clarity items, and precision engineering housings",
    foodContactStatus: "Moulded from food-grade virgin resin (supplier-certified)",
    environmentalBenefit: "Recyclable where PP and HDPE collection exists; high structural durability prevents premature disposal.",
  },
  {
    grade: "GR2",
    title: "GR2 Reprocessed Grade",
    source: "Clean post-industrial polymer regrind and sorted single-origin scrap",
    bestUsedFor: "Utility household basins (Basin GR2), heavy clothes hangers (Hanger GR2), and workshop sorting trays (for example, non-food parts organisation)",
    foodContactStatus: "Not intended for direct food or drink contact — utility use only",
    environmentalBenefit: "Directly diverts industrial and post-commercial polymers from local landfills; reduces demand for prime virgin resin.",
  },
  {
    grade: "GR3",
    title: "GR3 Economy Recycled",
    source: "Secondary recycled polymer blends and agricultural/industrial recovered plastics",
    bestUsedFor: "Heavy economy wash basins (Basin GR3) and agricultural nursery trays (for example, horticultural seedling propagation and construction utility)",
    foodContactStatus: "Strictly non-food utility grade",
    environmentalBenefit: "Maximises circularity by providing a secondary product life for recovered polymers across Kenya.",
  },
];

export const MANUFACTURING_PRACTICES = [
  {
    title: "Closed-Loop In-House Regrind",
    detail: "Clean production scrap is reground and reused in utility batches. In-factory granulation reclaims clean sprues and runners directly on the production floor.",
  },
  {
    title: "Permanent Resin Mould Codes",
    detail: "Every product cavity is engraved with resin identification codes (e.g. 5 PP, 2 HDPE) to facilitate clear sorting at local collection and recycling facilities.",
  },
  {
    title: "Kitengela Local Production",
    detail: "Finished goods are made locally, cutting shipping of bulky imported homewares compared to shipping hollow, voluminous finished plastic items.",
  },
];

export const DATED_COMMITMENTS = [
  {
    year: "12 Months Post-Launch",
    title: "First Annual Impact & Material Report",
    target: "Publish measured figures on total tonnage of recycled polymer consumed, scrap recovery rates, and energy consumed per kilogram of output.",
  },
  {
    year: "Year 1 Compliance",
    title: "Extended Producer Responsibility (EPR)",
    target: "Complete statutory producer take-back registration under Kenya's Sustainable Waste Management Act and NEMA EPR regulations prior to full commercial rollout.",
  },
  {
    year: "2027 Target",
    title: "60%+ Recycled Feedstock in Household Utilities",
    target: "Transition over 60% of total utility basin and hanger manufacturing volume to locally sourced reprocessed grades.",
  },
  {
    year: "Statutory & Quality Roadmap",
    title: "KEBS Standardization Mark (S-Mark) & ISO Alignment",
    target: "Formal submission for KEBS Standardization Mark (S-Mark) certification across commercial product lines, alongside national EPR compliance onboarding under NEMA regulations.",
  },
];

export const BUYER_FAQS = [
  {
    q: "Do you use recycled plastic in your manufacturing?",
    a: "Yes. PurePlast produces two of its three material grades (GR2 and GR3) from recycled and reprocessed plastics. We use virgin polymer only where product safety, food contact compliance, or technical engineering specifications require it.",
  },
  {
    q: "Which products are suitable for food and dining contact?",
    a: "Dining tableware items (including our virgin plates, drinking mugs, and tumblers) are moulded strictly from supplier-certified food-grade virgin polymer. Recycled GR2 and GR3 grades are strictly non-food utility lines (such as sorting trays, nursery trays, and utility basins) and are never used for dining or food-contact products.",
  },
  {
    q: "Can PurePlast products be recycled at end-of-life?",
    a: "Yes. All our products are moulded from mono-materials (predominantly Polypropylene and High-Density Polyethylene) with standard resin recycling identification marks engraved directly into the moulds to streamline post-consumer sorting.",
  },
  {
    q: "Can you provide documentation for our corporate ESG questionnaire?",
    a: "Yes. We provide our formal Supplier Sustainability Statement for corporate procurement teams, covering material policies, grade definitions, polymer traceability, and operational standards.",
  },
];

export const SUPPLIER_SUSTAINABILITY_STATEMENT = {
  title: "PurePlast Supplier Sustainability Statement",
  version: "Launch Edition (2026)",
  entity: "PurePlast Industries Ltd · Kitengela, Kajiado County, Kenya",
  summary:
    "PurePlast is founded on the principle that industrial manufacturing in Kenya should be transparent, accountable, and circular by design. This statement details our materials policy, polymer grade allocations, closed-loop scrap recovery, and compliance commitments for enterprise buyers and institutional procurement.",
  sections: [
    {
      heading: "1. Raw Materials & Feedstock Policy",
      content:
        "PurePlast categorises all production into three defined material tiers: Virgin Polymer (first-run prime resin for tableware and precision components), GR2 (clean reprocessed industrial scrap for utility household items), and GR3 (secondary recycled polyolefin blends for economy heavy-duty use). We never blend recycled feedstock into dining tableware, nor do we compromise food contact integrity.",
    },
    {
      heading: "2. In-Factory Circularity & Waste Avoidance",
      content:
        "Our Kitengela injection moulding facility operates closed-loop sprue and runner granulators at machine-side. Clean process trimmings are reground immediately and reintroduced into approved secondary production runs. Machine chillers utilise recirculated closed-loop cooling water to eliminate industrial effluent.",
    },
    {
      heading: "3. Compliance & Standards Roadmap",
      content:
        "As a new production facility, PurePlast is establishing operational baselines prior to external certification. We have structured our manufacturing operations to comply with KEBS Standardization Mark (S-Mark) requirements, NEMA environmental guidelines, and Extended Producer Responsibility (EPR) regulations under Kenya's Sustainable Waste Management Act.",
    },
    {
      heading: "4. Verification & Reporting Integrity",
      content:
        "PurePlast commits to publishing only measured operational data. In place of uncorroborated carbon offset figures or speculative diverted tonnages, our first comprehensive annual material impact report will be issued within 12 months of sustained plant operations.",
    },
  ],
};

// Legacy compatibility types and stubs
export interface ImpactMetric {
  label: string;
  value?: string;
  unit?: string;
  status: "verified" | "pending";
}

export interface Certification {
  label: string;
  sub: string;
  status: string;
}

export interface ClientLogo {
  name: string;
  imageUrl: string;
}

export const VERIFIED_CERTIFICATIONS: Certification[] = [];
export const TARGET_CERTIFICATIONS: Certification[] = [];
export const CLIENT_LOGOS: ClientLogo[] = [];
export const SUSTAINABILITY_METRICS: Record<string, ImpactMetric> = {};
export const ESG_REPORT_PATH = "/documents/pureplast-statement.pdf";
export function isEsgReportAvailable(): boolean { return false; }

