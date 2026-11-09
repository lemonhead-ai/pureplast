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
  unit?: string; // e.g. "In bundles of 40"
  bundleSize?: number;
  inStock?: boolean;
  
  // Specifications for catalog and detail pages
  capacity?: string;
  dimensions?: string;
  weight?: string;
  colors?: string[];
  resinType?: string;
  gradeVariants?: { id: string; label: string; grade: string }[];
  engineeringSpecs?: {
    tolerances?: string;
    finishes?: string;
    leadTime?: string;
    fileFormats?: string[];
    materials?: string[];
  };

  // Material Grade & Traceability
  materialGrade?: "VIRGIN" | "GR2" | "GR3" | "POST_CONSUMER" | "MIXED";
  foodContactSafe?: boolean;
  sustainabilityNotes?: string;
}

export interface Category {
  id: ProductCategory;
  label: string;
  tagline: string;
  accentColor: string;
  isComingSoon?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: "household",
    label: "Household",
    tagline: "Heavy-duty basins, storage, and utility containers",
    accentColor: "#004C97",
  },
  {
    id: "kitchen",
    label: "Tableware & Kitchen",
    tagline: "Plates, mugs, tumblers, and dining essentials",
    accentColor: "#108E2B",
  },
  {
    id: "laundry-storage",
    label: "Laundry & Storage",
    tagline: "Heavy-duty laundry pegs and domestic storage solutions",
    accentColor: "#E67E22",
  },
  {
    id: "retail-hanging",
    label: "Retail & Hanging",
    tagline: "Durable clothes hangers and retail display accessories",
    accentColor: "#C0392B",
  },
  {
    id: "engineered",
    label: "Engineered Parts",
    tagline: "Custom injection-moulded precision components",
    accentColor: "#0B1215",
  },
  {
    id: "furniture",
    label: "Furniture",
    tagline: "Indoor and outdoor polymer furniture (Soon)",
    accentColor: "#8E44AD",
    isComingSoon: true,
  },
];

export const PRODUCTS: Product[] = [
  // ─── BASINS (HOUSEHOLD) ──────────────────────────────────────────────────────────
  {
    id: "b-001",
    name: "Basin Virgin",
    description: "High-grade virgin polymer basin designed for heavy everyday domestic and commercial washing. Resistant to stress cracking with reinforced rim grip.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851544/b3_xqmjzq.jpg",
    images: [
      "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851544/b3_xqmjzq.jpg",
      "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851544/b2_d59wvr.jpg",
    ],
    isEngineered: false,
    category: "household",
    sku: "PP-BAS-001",
    featured: true,
    unit: "In bundles of 40",
    bundleSize: 40,
    materialGrade: "VIRGIN",
    capacity: "25 Litres",
    dimensions: "520 mm diameter × 220 mm height",
    weight: "620g",
    resinType: "High-Density Polyethylene (HDPE)",
    colors: ["Cobalt Blue", "Forest Green", "Signal Red", "Charcoal"],
    gradeVariants: [
      { id: "b-002", label: "Basin GR2 (Durable Recycled)", grade: "GR2" },
      { id: "b-003", label: "Basin GR3 (Economy Recycled)", grade: "GR3" },
    ],
    sustainabilityNotes: "Made from prime virgin polymer. Recyclable where HDPE collection exists.",
  },
  {
    id: "b-002",
    name: "Basin GR2",
    description: "Heavy-duty recycled polymer basin manufactured from clean reprocessed feedstock. Engineered for rigorous non-food domestic washing and site use.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851544/b2_d59wvr.jpg",
    isEngineered: false,
    category: "household",
    sku: "PP-BAS-GR2",
    unit: "In bundles of 40",
    bundleSize: 40,
    materialGrade: "GR2",
    capacity: "25 Litres",
    dimensions: "520 mm diameter × 220 mm height",
    weight: "630g",
    resinType: "Reprocessed Polyethylene (PE)",
    colors: ["Utility Charcoal", "Dark Green", "Industrial Blue"],
    gradeVariants: [
      { id: "b-001", label: "Basin Virgin (Prime Grade)", grade: "VIRGIN" },
      { id: "b-003", label: "Basin GR3 (Economy Recycled)", grade: "GR3" },
    ],
    sustainabilityNotes: "Manufactured from clean reprocessed polymer regrind.",
  },
  {
    id: "b-003",
    name: "Basin GR3",
    description: "Economy utility basin moulded from secondary recycled blend polymers. Exceptional cost efficiency for agriculture, construction, and heavy cleaning.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851544/b1_punevg.jpg",
    isEngineered: false,
    category: "household",
    sku: "PP-BAS-GR3",
    unit: "In bundles of 40",
    bundleSize: 40,
    materialGrade: "GR3",
    capacity: "25 Litres",
    dimensions: "520 mm diameter × 220 mm height",
    weight: "640g",
    resinType: "Secondary Recycled Polyolefin Blend",
    colors: ["Black", "Mottled Charcoal"],
    gradeVariants: [
      { id: "b-001", label: "Basin Virgin (Prime Grade)", grade: "VIRGIN" },
      { id: "b-002", label: "Basin GR2 (Durable Recycled)", grade: "GR2" },
    ],
    sustainabilityNotes: "Economy line utilising secondary post-industrial recycled feedstock.",
  },
  {
    id: "p-003",
    name: "Utility Sorting Tray GR2 (Recycled)",
    description: "Durable recycled polymer utility tray moulded from clean reprocessed feedstock for workshop hardware, non-food sorting, and parts organisation. Not intended for food contact.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851539/p4_pa8ir8.jpg",
    isEngineered: false,
    category: "household",
    sku: "PP-TRY-GR2",
    unit: "In bundles of 120",
    bundleSize: 120,
    materialGrade: "GR2",
    dimensions: "220 mm diameter",
    weight: "88g",
    resinType: "Reprocessed Polypropylene",
    sustainabilityNotes: "Utility grade recycled polymer regrind. Strictly non-food utility.",
  },
  {
    id: "p-004",
    name: "Agricultural Nursery Tray GR3 (Recycled)",
    description: "Heavy-duty recycled polymer tray moulded from secondary recycled polyolefin blends for horticultural seedling propagation, nursery potting, and non-food storage. Strictly non-food utility.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/p3_qvtbqk.jpg",
    isEngineered: false,
    category: "household",
    sku: "PP-NUR-GR3",
    unit: "In bundles of 120",
    bundleSize: 120,
    materialGrade: "GR3",
    dimensions: "220 mm diameter",
    weight: "90g",
    resinType: "Secondary Recycled Polyolefin Blend",
    sustainabilityNotes: "Economy recycled blend polymer. Strictly non-food utility.",
  },
  {
    id: "m-002",
    name: "Workshop Utility Scoop GR2 (Recycled)",
    description: "Rugged recycled polymer scoop cup with handle moulded from reprocessed plastic for dry granules, workshop hardware, and utility measuring. Not intended for food or beverage contact.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851542/m2_mnvdwv.jpg",
    isEngineered: false,
    category: "household",
    sku: "PP-SCP-GR2",
    unit: "In bundles of 144",
    bundleSize: 144,
    materialGrade: "GR2",
    capacity: "400ml",
    weight: "75g",
    resinType: "Reprocessed Polypropylene",
    sustainabilityNotes: "Utility grade recycled polymer. Strictly non-food utility.",
  },

  // ─── PLATES, MUGS & TUMBLERS (TABLEWARE & KITCHEN - 100% VIRGIN) ──────────────────────────
  {
    id: "p-001",
    name: "Plate Virgin (Plain)",
    description: "Smooth-finish dining plate moulded from supplier-certified food-grade virgin polymer for institutional dining, schools, restaurants, and domestic use.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851540/p5_uoksgm.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-PLT-001",
    featured: true,
    unit: "In bundles of 120",
    bundleSize: 120,
    materialGrade: "VIRGIN",
    dimensions: "220 mm diameter",
    weight: "85g",
    resinType: "Polypropylene (PP)",
    colors: ["Pure White", "Cobalt Blue", "Teal"],
    sustainabilityNotes: "Moulded from supplier-certified food-grade virgin polymer. Recyclable where PP collection exists.",
  },
  {
    id: "p-002",
    name: "Plate Virgin Flowered",
    description: "Decorative embossed rim plate moulded from supplier-certified virgin polymer for catering, events, and household tableware.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/p2_uqobip.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-PLT-FLW",
    unit: "In bundles of 120",
    bundleSize: 120,
    materialGrade: "VIRGIN",
    dimensions: "220 mm diameter",
    weight: "88g",
    resinType: "Polypropylene (PP)",
    colors: ["White with Floral Relief", "Pastel Sky Blue"],
  },
  {
    id: "p-005",
    name: "Plate 18CM Plain",
    description: "Compact 18cm side plate moulded from supplier-certified virgin polymer. Ideal for tea services, side dishes, schools, and institutional catering.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851540/p5_uoksgm.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-PLT-18P",
    unit: "In bundles of 216",
    bundleSize: 216,
    materialGrade: "VIRGIN",
    dimensions: "180 mm diameter",
    weight: "65g",
    resinType: "Polypropylene (PP)",
    colors: ["Classic White", "Royal Blue", "Warm Yellow"],
  },
  {
    id: "p-006",
    name: "Plate 18CM Flowered",
    description: "Decorative 18cm side plate with embossed floral motif around rim moulded from supplier-certified virgin polymer. Compact design for event catering and hospitality.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/p2_uqobip.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-PLT-18F",
    unit: "In bundles of 216",
    bundleSize: 216,
    materialGrade: "VIRGIN",
    dimensions: "180 mm diameter",
    weight: "68g",
    resinType: "Polypropylene (PP)",
    colors: ["White with Floral Relief", "Rose Pink"],
  },
  {
    id: "m-001",
    name: "Mug Virgin",
    description: "Sturdy 400ml drinking mug with ergonomic handle moulded from supplier-certified food-grade virgin polymer. High heat resistance for hot and cold beverages.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851542/m3_y1adig.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-MUG-001",
    featured: true,
    unit: "In bundles of 144",
    bundleSize: 144,
    materialGrade: "VIRGIN",
    capacity: "400ml",
    weight: "72g",
    resinType: "Polypropylene (PP)",
    colors: ["Bright Blue", "Sunshine Yellow", "White"],
  },
  {
    id: "t-001",
    name: "Standard Tumbler (350ml)",
    description: "Stackable 350ml drinking tumbler moulded from supplier-certified food-grade virgin polymer with textured grip bands. Ideal for schools, cafeterias, and domestic use.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/t3_wmu9dd.jpg",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-TUM-350",
    unit: "In bundles of 144",
    bundleSize: 144,
    materialGrade: "VIRGIN",
    capacity: "350ml",
    dimensions: "110 mm height × 75 mm rim diameter",
    weight: "48g",
    resinType: "Polypropylene (PP)",
    colors: ["Translucent Blue", "Clear Tint", "Emerald Green"],
  },
  {
    id: "t-002",
    name: "Fluted Tumbler (450ml)",
    description: "Generous 450ml fluted drinking cup with reinforced base and rim moulded from supplier-certified food-grade virgin polymer. Styled for catering establishments, outdoor events, and home dining.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/t4_ydlqsf.jpg",
    images: [
      "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/t4_ydlqsf.jpg",
      "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851543/t3_wmu9dd.jpg",
    ],
    isEngineered: false,
    category: "kitchen",
    sku: "PP-TUM-450",
    unit: "In bundles of 144",
    bundleSize: 144,
    materialGrade: "VIRGIN",
    capacity: "450ml",
    dimensions: "135 mm height × 82 mm rim diameter",
    weight: "62g",
    resinType: "Polypropylene (PP)",
    colors: ["Sky Blue", "Coral", "Translucent Neutral"],
  },

  // ─── HANGERS & PEGS (RETAIL & LAUNDRY) ───────────────────────────────────────────
  {
    id: "h-001",
    name: "Hanger Virgin",
    description: "Premium smooth-moulded clothes hanger with strap notches and reinforced collar support. Engineered for retail garment display and wardrobes.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851540/h4_trqnxy.jpg",
    isEngineered: false,
    category: "retail-hanging",
    sku: "PP-HNG-001",
    featured: true,
    unit: "In bundles of 240",
    bundleSize: 240,
    materialGrade: "VIRGIN",
    dimensions: "420 mm width × 200 mm height",
    weight: "45g",
    resinType: "High-Impact Polypropylene",
    colors: ["Jet Black", "Crisp White"],
    gradeVariants: [
      { id: "h-002", label: "Hanger GR2 (Recycled Black)", grade: "GR2" },
    ],
  },
  {
    id: "h-002",
    name: "Hanger GR2",
    description: "Heavy-duty recycled polymer clothes hanger for commercial laundries, garment factories, and budget retail displays.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778851539/h1_vdkf5q.jpg",
    isEngineered: false,
    category: "retail-hanging",
    sku: "PP-HNG-GR2",
    unit: "In bundles of 240",
    bundleSize: 240,
    materialGrade: "GR2",
    dimensions: "420 mm width × 200 mm height",
    weight: "48g",
    resinType: "Reprocessed Polypropylene",
    colors: ["Matte Black"],
    sustainabilityNotes: "Moulded from reprocessed industrial polymer regrind.",
  },
  {
    id: "pg-001",
    name: "Pegs (Heavy-Duty Clothes Pegs)",
    description: "High-tension spring clothes pegs engineered with weather-resistant polymer jaws and rust-treated wire springs. Built for windy drying yards.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357439/pegs_pebitg.jpg",
    isEngineered: false,
    category: "laundry-storage",
    sku: "PP-PEG-4320",
    featured: true,
    unit: "In master cartons of 4,320 pcs",
    bundleSize: 4320,
    materialGrade: "VIRGIN",
    dimensions: "72 mm length × 14 mm width",
    resinType: "UV-Stabilised Polypropylene",
    colors: ["Assorted Multi-Colour Packs"],
  },

  // ─── ENGINEERED PARTS (CUSTOM / B2B) ────────────────────────────────────────
  {
    id: "e-001",
    name: "Custom Injection-Moulded Housing",
    description: "Bespoke polymer enclosures for electrical, IoT, and mechanical assemblies. Tooling engineered directly from your CAD models or 2D technical drawings.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357438/injectionmoulded_di0z1j.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-001",
    featured: true,
    materialGrade: "VIRGIN",
    engineeringSpecs: {
      tolerances: "Precision injection moulding tolerances",
      finishes: "SPI-A2 gloss, VDI 3400 spark erosion texture, or matte",
      leadTime: "Tooling in 3–5 weeks; production runs quoted within 24 hours",
      fileFormats: ["STEP", "IGES", "STL", "DXF", "PDF"],
      materials: ["ABS", "Polypropylene (PP)", "HDPE", "Polycarbonate (PC)"],
    },
  },
  {
    id: "e-002",
    name: "Precision Snap-Fit Clips",
    description: "High-tolerance polymer retention clips and industrial fasteners engineered for repetitive assembly and fatigue resistance.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357438/injectionmoulded_di0z1j.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-002",
    materialGrade: "VIRGIN",
    engineeringSpecs: {
      tolerances: "Precision snap-fit assembly tolerances",
      finishes: "Low-friction satin finish",
      leadTime: "Samples in 5 business days; batch runs scheduled on agreement",
      fileFormats: ["STEP", "IGES", "STL", "PDF"],
      materials: ["POM (Acetal)", "Nylon PA6/PA66", "Polypropylene"],
    },
  },
  {
    id: "e-003",
    name: "Custom Automotive Trim Panel",
    description: "Injection-moulded interior and under-hood automotive trim components. Manufactured to custom dimensions with automotive-grade texture and ribbing.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357440/trimpanel_mbs8si.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-003",
    materialGrade: "VIRGIN",
    engineeringSpecs: {
      tolerances: "Precision automotive trim tolerances",
      finishes: "OEM-matched automotive leatherette grain or textured matte",
      leadTime: "Quoted per project within 24 hours",
      fileFormats: ["STEP", "IGES", "Catia (STP)", "PDF"],
      materials: ["Impact-Modified Polypropylene", "ABS", "PC/ABS blend"],
    },
  },
  {
    id: "e-004",
    name: "Agricultural Drip Emitter Body",
    description: "Precision-moulded labyrinth emitter bodies for commercial micro-irrigation lines. Engineered for uniform flow rate and high UV exposure.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357439/dripemitter_wkbkuj.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-004",
    materialGrade: "VIRGIN",
    engineeringSpecs: {
      tolerances: "Precision micro-irrigation labyrinth tolerances",
      finishes: "Mirror-polish flow path",
      leadTime: "High-volume multi-cavity scheduling on request",
      fileFormats: ["STEP", "IGES", "PDF"],
      materials: ["UV-Stabilised Virgin Polyethylene (LLDPE/HDPE)", "PP"],
    },
  },
  {
    id: "e-005",
    name: "Custom Packaging Trays",
    description: "Rigid thermoformed and injection-moulded trays for industrial parts kitting, pharmaceutical vials, and retail display sorting.",
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357438/packagingtray_dneqei.jpg",
    isEngineered: true,
    category: "engineered",
    sku: "PP-ENG-005",
    materialGrade: "VIRGIN",
    engineeringSpecs: {
      tolerances: "Precision thermoformed and moulded tolerances",
      finishes: "Smooth or anti-static coated",
      leadTime: "Tooling sample in 10 business days",
      fileFormats: ["STEP", "IGES", "DXF", "PDF"],
      materials: ["HIPS", "PET", "Polypropylene (PP)"],
    },
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
  GR2: "GR2 recycled grade",
  GR3: "GR3 economy recycled",
  POST_CONSUMER: "Post-consumer recycled",
  MIXED: "Mixed feedstock",
};

export function getMaterialGradeLabel(grade?: Product["materialGrade"]): string | null {
  if (!grade) return null;
  return MATERIAL_GRADE_LABELS[grade] ?? grade.replace("_", " ");
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
  foodContactSafe?: boolean | null;
  sustainabilityNotes?: string | null;
  images?: { sortOrder: number; imageUrl: string }[];
}): Product {
  const sortedImages = (p.images ?? [])
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((img) => img.imageUrl);

  const fallback = PRODUCTS.find((prod) => prod.id === p.id || prod.sku === p.sku);

  const allImages =
    sortedImages.length > 0
      ? sortedImages
      : p.imageUrl
      ? [p.imageUrl]
      : fallback?.images && fallback.images.length > 0
      ? fallback.images
      : fallback?.image
      ? [fallback.image]
      : [];

  return {
    id: p.id,
    name: p.name,
    description: p.description || fallback?.description || "",
    price: undefined, // All launch-day factory lines are quote-based wholesale pricing
    image: p.imageUrl || fallback?.image || allImages[0] || "",
    images: allImages,
    isEngineered: p.category === "engineered",
    category: (p.category as ProductCategory) || fallback?.category || "household",
    sku: p.sku || fallback?.sku || "",
    featured: p.featured,
    unit: p.unit || fallback?.unit || undefined,
    bundleSize: fallback?.bundleSize,
    inStock: p.category === "engineered" ? true : p.stockQuantity >= 0,
    materialGrade: p.materialGrade || fallback?.materialGrade,
    foodContactSafe: p.foodContactSafe ?? fallback?.foodContactSafe,
    sustainabilityNotes: p.sustainabilityNotes || fallback?.sustainabilityNotes,
    capacity: fallback?.capacity,
    dimensions: fallback?.dimensions,
    weight: fallback?.weight,
    resinType: fallback?.resinType,
    colors: fallback?.colors,
    gradeVariants: fallback?.gradeVariants,
    engineeringSpecs: fallback?.engineeringSpecs,
  };
}
