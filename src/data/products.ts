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
  isEngineered: boolean;
  category: ProductCategory;
  sku: string;
  featured?: boolean;
  unit?: string; // e.g. "per piece", "per dozen"
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
  // ─── HOUSEHOLD ───────────────────────────────────────────────────────────────
  {
    id: "h-001",
    name: "Premium Plastic Mug",
    description:
      "Thick-walled, BPA-free plastic mug with an ergonomic handle. Ideal for hot and cold beverages. Available in assorted colours.",
    price: 120,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/v1778354600/mug_bxpon1.jpg",
    isEngineered: false,
    category: "household",
    sku: "PP-MUG-001",
    featured: true,
    unit: "per piece",
  },
  {
    id: "h-002",
    name: "Double-Walled Tumbler",
    description:
      "Insulated double-wall design keeps drinks cold for up to 6 hours. Spill-resistant lid included.",
    price: 195,
    image: "",
    isEngineered: false,
    category: "household",
    sku: "PP-TUM-002",
    unit: "per piece",
  },
  {
    id: "h-003",
    name: "Round Wash Basin – 15L",
    description:
      "High-density polyethylene basin, 15-litre capacity. Smooth interior finish for easy cleaning. Comes in a range of vibrant colours.",
    price: 350,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/v1778355078/washbasin_ztmn5f.jpg",
    isEngineered: false,
    category: "household",
    sku: "PP-BAS-003",
    featured: true,
    unit: "per piece",
  },
  {
    id: "h-004",
    name: "Round Wash Basin – 25L",
    description:
      "Heavy-duty 25-litre basin suitable for washing, soaking, and general household use.",
    price: 480,
    image: "",
    isEngineered: false,
    category: "household",
    sku: "PP-BAS-004",
    unit: "per piece",
  },
  {
    id: "h-005",
    name: "Water Pitcher – 2L",
    description:
      "Crystal-clear food-grade plastic pitcher with a wide mouth and secure lid. Ideal for water, juices, and cold drinks.",
    price: 275,
    image: "",
    isEngineered: false,
    category: "household",
    sku: "PP-PIT-005",
    unit: "per piece",
  },

  // ─── KITCHEN ─────────────────────────────────────────────────────────────────
  {
    id: "k-001",
    name: "Mixing Bowl Set (3-Piece)",
    description:
      "Nested mixing bowls in three sizes (1L, 2L, 3.5L). Non-slip base, easy-grip rims, food-grade plastic.",
    price: 550,
    image: "",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-MXB-001",
    featured: true,
    unit: "per set",
  },
  {
    id: "k-002",
    name: "Round Flat Plate",
    description:
      "Durable flat plates for everyday use. Microwave-safe, BPA-free, stackable design.",
    price: 95,
    image: "",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-PLT-002",
    unit: "per piece",
  },
  {
    id: "k-003",
    name: "Deep Soup Bowl",
    description:
      "Wide-rimmed soup bowl, 600ml capacity. Heat-resistant plastic, easy to clean.",
    price: 115,
    image: "",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-BWL-003",
    unit: "per piece",
  },
  {
    id: "k-004",
    name: "Colander / Draining Basket",
    description:
      "Large perforated colander for draining pasta, vegetables, and fruits. Stable feet to sit in sink.",
    price: 320,
    image: "",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-COL-004",
    unit: "per piece",
  },
  {
    id: "k-005",
    name: "Cutting Board – Large",
    description:
      "High-density polyethylene cutting board with juice grooves. Non-slip grip on all four corners. Dishwasher safe.",
    price: 420,
    image: "",
    isEngineered: false,
    category: "kitchen",
    sku: "PP-CTB-005",
    unit: "per piece",
  },

  // ─── LAUNDRY & STORAGE ────────────────────────────────────────────────────────
  {
    id: "ls-001",
    name: "Heavy-Duty Bucket – 10L",
    description:
      "Thick-walled 10-litre bucket with reinforced handle. Suitable for household and light industrial use.",
    price: 290,
    image: "",
    isEngineered: false,
    category: "laundry-storage",
    sku: "PP-BKT-001",
    featured: true,
    unit: "per piece",
  },
  {
    id: "ls-002",
    name: "Heavy-Duty Bucket – 20L",
    description:
      "Industrial-grade 20-litre bucket. High-impact resistant walls, comfort-grip handle.",
    price: 450,
    image: "",
    isEngineered: false,
    category: "laundry-storage",
    sku: "PP-BKT-002",
    unit: "per piece",
  },
  {
    id: "ls-003",
    name: "Laundry Basket – Oval 40L",
    description:
      "Wide-mouth rectangle laundry basket with ventilated sides. Soft-touch handles for comfortable carrying.",
    price: 680,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778355500/laundrybasket_mtrmbv.jpg",
    isEngineered: false,
    category: "laundry-storage",
    sku: "PP-LBK-003",
    unit: "per piece",
  },
  {
    id: "ls-004",
    name: "Square Storage Crate",
    description:
      "Stackable square crate for storage or retail display. Ridged base for stability. Available in multiple colours.",
    price: 520,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778355499/storagebin_cmgwe8.jpg",
    isEngineered: false,
    category: "laundry-storage",
    sku: "PP-CRT-004",
    unit: "per piece",
  },
  {
    id: "ls-005",
    name: "Wastebasket / Dustbin – 10L",
    description:
      "Slim-profile wastebasket with a removable inner liner. Smooth finish for easy wiping.",
    price: 10,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778355715/wastebucket_b5wlh7.jpg",
    isEngineered: false,
    category: "laundry-storage",
    sku: "PP-DST-005",
    unit: "per piece",
  },

  // ─── FURNITURE ────────────────────────────────────────────────────────────────
  {
    id: "f-001",
    name: "Monobloc Plastic Chair",
    description:
      "UV-stabilised, weather-resistant monobloc chair. Stackable up to 10 units. Rated for 120kg load.",
    price: 1800,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357437/monobloc_bysgen.jpg",
    isEngineered: false,
    category: "furniture",
    sku: "PP-CHR-001",
    featured: true,
    unit: "per piece",
  },
  {
    id: "f-002",
    name: "Plastic Bar Stool",
    description:
      "Lightweight bar stool with non-slip foot pads. Ideal for kitchen counters, bars, and events.",
    price: 1400,
    image: "",
    isEngineered: false,
    category: "furniture",
    sku: "PP-STL-002",
    unit: "per piece",
  },
  {
    id: "f-003",
    name: "Children's Low Stool",
    description:
      "Small, rounded stool for children aged 2–8. Smooth edges, non-toxic plastic, easy to wipe clean.",
    price: 480,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357437/childrenlowstool_e7tmnc.jpg",
    isEngineered: false,
    category: "furniture",
    sku: "PP-CST-003",
    unit: "per piece",
  },
  {
    id: "f-004",
    name: "Folding Plastic Table – 4-Seater",
    description:
      "Portable folding table with a UV-resistant top surface and collapsible legs. Great for outdoor events.",
    price: 5500,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357438/foldingplastic_s6bhlx.jpg",
    isEngineered: false,
    category: "furniture",
    sku: "PP-TBL-004",
    unit: "per piece",
  },

  // ─── RETAIL & HANGING ────────────────────────────────────────────────────────
  {
    id: "rh-001",
    name: "Standard Clothes Hanger",
    description:
      "Slim, strong plastic hanger with a 360° swivel hook. Space-saving design. Available in packs of 12.",
    price: 350,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778355501/hangers_g0cdhm.jpg",
    isEngineered: false,
    category: "retail-hanging",
    sku: "PP-HNG-001",
    featured: true,
    unit: "pack of 12",
  },
  {
    id: "rh-002",
    name: "Heavy-Duty Trouser Hanger",
    description:
      "Bar hanger with non-slip grips for trousers, skirts, and folded items. Extra-wide bar design.",
    price: 85,
    image: "",
    isEngineered: false,
    category: "retail-hanging",
    sku: "PP-HNG-002",
    unit: "per piece",
  },
  {
    id: "rh-003",
    name: "Laundry Pegs – Clip Type",
    description:
      "Spring-loaded clothes pegs with strong stainless steel springs. Rust-proof, UV-resistant casing.",
    price: 180,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357439/pegs_pebitg.jpg",
    isEngineered: false,
    category: "retail-hanging",
    sku: "PP-PEG-003",
    unit: "pack of 20",
  },
  {
    id: "rh-004",
    name: "Peg Bag / Holder",
    description:
      "Hanging peg bag with a reinforced hanger hook. Wide opening for easy access. Mesh ventilated sides.",
    price: 220,
    image: "https://res.cloudinary.com/dfjwbc8i7/image/upload/q_auto/f_auto/v1778357438/pegholder_fixsqq.jpg",
    isEngineered: false,
    category: "retail-hanging",
    sku: "PP-PGB-004",
    unit: "per piece",
  },
  {
    id: "rh-005",
    name: "Retail Display Hook",
    description:
      "L-shaped retail peg hook for slatwall and pegboard displays. 200mm projection. Pack of 10.",
    price: 450,
    image: "",
    isEngineered: false,
    category: "retail-hanging",
    sku: "PP-DHK-005",
    unit: "pack of 10",
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