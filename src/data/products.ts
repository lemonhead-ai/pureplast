export type ProductCategory =
  | "household"
  | "kitchen"
  | "laundry-storage"
  | "furniture"
  | "retail-hanging"
  | "engineered";

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  image: string;
  images?: string[];
  isEngineered: boolean;
  category: ProductCategory;
  sku: string;
  featured?: boolean;
  unit?: string; // e.g. "per piece", "per dozen"
  inStock?: boolean;
  
  // Sustainability
  recycledContentPct?: number;
  materialGrade?: "VIRGIN" | "GR2" | "GR3" | "POST_CONSUMER" | "MIXED";
  carbonOffset?: boolean;
  bpaFree?: boolean;
  foodSafe?: boolean;
  sustainabilityNotes?: string;
}

export interface Category {
  id: ProductCategory;
  label: string;
  tagline: string;
  accentColor: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "household",
    label: "Household",
    tagline: "Everyday essentials built to last",
    accentColor: "#004C97",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    tagline: "Functional kitchenware, precision made",
    accentColor: "#108E2B",
  },
  {
    id: "laundry-storage",
    label: "Laundry & Storage",
    tagline: "Heavy-duty solutions for daily chores",
    accentColor: "#E67E22",
  },
  {
    id: "furniture",
    label: "Furniture",
    tagline: "Durable plastics for indoor and outdoor use",
    accentColor: "#8E44AD",
  },
  {
    id: "retail-hanging",
    label: "Retail & Hanging",
    tagline: "Display, store, and organise with ease",
    accentColor: "#C0392B",
  },
  {
    id: "engineered",
    label: "Engineered Parts",
    tagline: "Custom-molded precision components",
    accentColor: "#0B1215",
  },
];

export const PRODUCTS: Product[] = [
  // ─── BASINS (HOUSEHOLD) ──────────────────────────────────────────────────────────
  {
    id: "b-001",
    name: "Basin Virgin",
    description: "High-quality virgin plastic basin for everyday household use.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851544/b3_xqmjzq.jpg",
    isEngineered: false,
    category: "household",
    sku: "BV 001",
    featured: true,
    unit: "In bundles of 40",
  },
  {
    id: "b-002",
    name: "Basin GR2",
    description: "Durable GR2 grade plastic basin.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851544/b2_d59wvr.jpg",
    isEngineered: false,
    category: "household",
    sku: "BAS-GR2",
    unit: "In bundles of 40",
  },
  {
    id: "b-003",
    name: "Basin GR3",
    description: "Cost-effective GR3 grade plastic basin.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851544/b1_punevg.jpg",
    isEngineered: false,
    category: "household",
    sku: "BAS-GR3",
    unit: "In bundles of 40",
  },

  // ─── PLATES (KITCHEN) ────────────────────────────────────────────────────────────
  {
    id: "p-001",
    name: "Plate Virgin",
    description: "Premium virgin plastic plate for serving.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851540/p5_uoksgm.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PV 001",
    featured: true,
    unit: "In bundles of 120",
  },
  {
    id: "p-002",
    name: "Plate Virgin Flowered",
    description: "Premium virgin plastic plate with decorative flowered design.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/p2_uqobip.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PV-FLW",
    unit: "In bundles of 120",
  },
  {
    id: "p-003",
    name: "Plate GR2",
    description: "Durable GR2 grade plastic plate.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851539/p4_pa8ir8.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PGR2-002",
    unit: "In bundles of 120",
  },
  {
    id: "p-004",
    name: "Plate GR3",
    description: "Cost-effective GR3 grade plastic plate.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/p3_qvtbqk.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PGR3-003",
    unit: "In bundles of 120",
  },
  {
    id: "p-005",
    name: "Plate 18CM Plain",
    description: "Standard 18cm plain plastic plate.",
    image: "",
    isEngineered: false,
    category: "kitchen",
    sku: "PLT-18P",
    unit: "In bundles of 216",
  },
  {
    id: "p-006",
    name: "Plate 18CM Flowered",
    description: "Standard 18cm plastic plate with flowered design.",
    image: "",
    isEngineered: false,
    category: "kitchen",
    sku: "PF001",
    unit: "In bundles of 216",
  },

  // ─── MUGS & TUMBLERS (HOUSEHOLD) ─────────────────────────────────────────────────
  {
    id: "m-001",
    name: "Mug Virgin",
    description: "Premium virgin plastic mug.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851542/m3_y1adig.jpg",
    isEngineered: false,
    category: "household",
    sku: "MUG-V",
    featured: true,
    unit: "In bundles of 144",
  },
  {
    id: "m-002",
    name: "Mug GR2",
    description: "Durable GR2 grade plastic mug.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851542/m2_mnvdwv.jpg",
    isEngineered: false,
    category: "household",
    sku: "MGR2-001",
    unit: "In bundles of 144",
  },
  {
    id: "t-001",
    name: "Tumbler (001)",
    description: "Standard plastic tumbler.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/t3_wmu9dd.jpg",
    isEngineered: false,
    category: "household",
    sku: "TUM-001",
    unit: "In bundles of 144",
  },
  {
    id: "t-002",
    name: "Tumbler (003)",
    description: "Standard plastic tumbler variant 003.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/t4_ydlqsf.jpg",
    images: [
      "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/t4_ydlqsf.jpg",
      "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/t3_wmu9dd.jpg",
    ],
    isEngineered: false,
    category: "household",
    sku: "TUM-003",
    unit: "In bundles of 144",
  },

  // ─── HANGERS & PEGS (RETAIL & HANGING) ───────────────────────────────────────────
  {
    id: "h-001",
    name: "Hanger Virgin",
    description: "Premium virgin plastic clothes hanger.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851540/h4_trqnxy.jpg",
    isEngineered: false,
    category: "retail-hanging",
    sku: "HV-001",
    featured: true,
    unit: "In bundles of 240",
  },
  {
    id: "h-002",
    name: "Hanger GR2",
    description: "Durable GR2 grade plastic clothes hanger.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851539/h1_vdkf5q.jpg",
    isEngineered: false,
    category: "retail-hanging",
    sku: "HNG-GR2",
    unit: "In bundles of 240",
  },
  {
    id: "pg-001",
    name: "Pegs",
    description: "Standard plastic laundry pegs.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357439/pegs_pebitg.jpg",
    isEngineered: false,
    category: "laundry-storage",
    sku: "PEG",
    featured: true,
    unit: "In bundles of 4320",
  },

  // ─── ENGINEERED PARTS ────────────────────────────────────────────────────────
  {
    id: "e-001",
    name: "Custom Injection-Moulded Housing",
    description:
      "Bespoke plastic housings for electronic or mechanical components. We work from your CAD files or sketches.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357438/injectionmoulded_di0z1j.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-001",
    featured: true,
  },
  {
    id: "e-002",
    name: "Precision Snap-Fit Clips",
    description:
      "High-tolerance snap-fit plastic clips and fasteners for assembly applications. Specify material, colour, and load rating.",
    image: "",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-002",
  },
  {
    id: "e-003",
    name: "Custom Automotive Trim Panel",
    description:
      "Injection-moulded interior trim components. ABS and PP materials available. Fits to OEM specifications.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357440/trimpanel_mbs8si.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-003",
  },
  {
    id: "e-004",
    name: "Agricultural Drip Emitter Body",
    description:
      "Precision plastic emitter components for drip irrigation systems. Tight dimensional tolerances, UV stabilised.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357439/dripemitter_wkbkuj.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-004",
  },
  {
    id: "e-005",
    name: "Custom Packaging Trays",
    description:
      "Thermoformed or injection-moulded packaging trays in any shape. Food-safe materials available on request.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357438/packagingtray_dneqei.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-005",
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getCategoryCount(category: ProductCategory): number {
  return PRODUCTS.filter((p) => p.category === category).length;
}

const MATERIAL_GRADE_LABELS: Record<NonNullable<Product["materialGrade"]>, string> = {
  VIRGIN: "Virgin polymer",
  GR2: "GR2 grade",
  GR3: "GR3 grade",
  POST_CONSUMER: "Post-consumer recycled",
  MIXED: "Mixed feedstock",
};

export function getMaterialGradeLabel(grade?: Product["materialGrade"]): string | null {
  if (!grade) return null;
  return MATERIAL_GRADE_LABELS[grade] ?? grade.replace("_", " ");
}

export function getSustainabilityBadges(product: Product): string[] {
  const badges: string[] = [];
  if (product.recycledContentPct != null && product.recycledContentPct > 0) {
    badges.push(`${product.recycledContentPct}% recycled`);
  }
  if (product.carbonOffset) badges.push("Carbon offset");
  if (product.bpaFree) badges.push("BPA-free");
  if (product.foodSafe) badges.push("Food safe");
  const gradeLabel = getMaterialGradeLabel(product.materialGrade);
  if (gradeLabel && product.materialGrade !== "VIRGIN") {
    badges.push(gradeLabel);
  }
  return badges;
}

export function hasSustainabilityData(product: Product): boolean {
  return (
    getSustainabilityBadges(product).length > 0 ||
    !!product.sustainabilityNotes ||
    !!product.materialGrade
  );
}

export function mapDbProduct(p: {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
  sku: string;
  featured: boolean;
  unit: string | null;
  stockQuantity: number;
  recycledContentPct?: number | null;
  materialGrade?: Product["materialGrade"] | null;
  carbonOffset?: boolean;
  bpaFree?: boolean | null;
  foodSafe?: boolean | null;
  sustainabilityNotes?: string | null;
  images?: { sortOrder: number; imageUrl: string }[];
}): Product {
  const sortedImages = (p.images ?? [])
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((img) => img.imageUrl);

  const allImages =
    sortedImages.length > 0 ? sortedImages : p.imageUrl ? [p.imageUrl] : [];

  return {
    id: p.id,
    name: p.name,
    description: p.description || "",
    price: p.price,
    image: p.imageUrl || "",
    images: allImages,
    isEngineered: p.category === "engineered",
    category: p.category as ProductCategory,
    sku: p.sku,
    featured: p.featured,
    unit: p.unit || undefined,
    inStock: p.category === "engineered" ? true : p.stockQuantity >= 0,
    recycledContentPct: p.recycledContentPct ?? undefined,
    materialGrade: p.materialGrade ?? undefined,
    carbonOffset: p.carbonOffset ?? false,
    bpaFree: p.bpaFree ?? undefined,
    foodSafe: p.foodSafe ?? undefined,
    sustainabilityNotes: p.sustainabilityNotes ?? undefined,
  };
}

/** Infer material grade from product name for seed backfill only. */
export function inferMaterialGradeFromName(name: string): Product["materialGrade"] | undefined {
  const upper = name.toUpperCase();
  if (upper.includes("VIRGIN")) return "VIRGIN";
  if (upper.includes("GR2")) return "GR2";
  if (upper.includes("GR3")) return "GR3";
  return undefined;
}