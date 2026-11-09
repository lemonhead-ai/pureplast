/**
 * Canonical company facts and configuration for PurePlast.
 * Every page references this file to ensure zero disagreement across the website.
 */

export const SITE_CONFIG = {
  name: "PurePlast",
  legalName: "PurePlast Industries Ltd",
  tagline: "Industrial Precision Plastic Solutions",
  establishmentYear: 2026,
  
  // Location
  location: {
    city: "Kitengela",
    county: "Kajiado County",
    country: "Kenya",
    address: "Kenya Prisons Road, Kitengela, Kajiado County, Kenya",
    shortAddress: "Kenya Prisons Road, Kitengela",
    regionalPresence: "Made in Kitengela, delivered across Nairobi and East Africa",
    coordinates: {
      lat: -1.4770626,
      lng: 36.9454802,
    },
    googleMapsEmbed: "https://maps.google.com/maps?q=-1.4770626,36.9454802&t=&z=16&ie=UTF8&iwloc=&output=embed",
    googleMapsDirections: "https://www.google.com/maps/dir/?api=1&destination=-1.4770626,36.9454802",
  },

  // Contact Details
  contact: {
    phone: "+254 710 678 753",
    phoneTel: "+254710678753",
    whatsapp: "+254 710 678 753",
    whatsappLink: "https://wa.me/254710678753?text=Hello%20PurePlast%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.",
    emails: {
      general: "info@pureplast.co.ke",
      sales: "sales@pureplast.co.ke",
      support: "support@pureplast.co.ke",
    },
  },

  // Business Hours
  hours: [
    { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 1:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  // Turnaround & Service Standards
  standards: {
    quoteTurnaround: "24 hours",
    quoteTurnaroundShort: "24h",
    minimumOrderNotice: "Wholesale orders are supplied in factory bundle packaging. Custom tooling is quoted on volume requirements.",
  },

  // Verified Catalog Facts (Launch Day Safe)
  stats: {
    productCount: 21,
    categoryCount: 6,
    activeLines: "21 products · 6 categories · Made in Kitengela · 24h quote reply",
  },
};

