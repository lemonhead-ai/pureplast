"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { MaterialGrade } from "@prisma/client";

const VALID_GRADES = new Set<string>(["VIRGIN", "GR2", "GR3", "POST_CONSUMER", "MIXED"]);

function parseSustainabilityFields(formData: FormData) {
  const recycledContentPctStr = formData.get("recycledContentPct") as string;
  let recycledContentPct: number | null = null;
  if (recycledContentPctStr) {
    recycledContentPct = parseInt(recycledContentPctStr, 10);
    if (Number.isNaN(recycledContentPct) || recycledContentPct < 0 || recycledContentPct > 100) {
      throw new Error("Recycled content must be between 0 and 100");
    }
  }

  const materialGradeStr = formData.get("materialGrade") as string;
  const materialGrade =
    materialGradeStr && VALID_GRADES.has(materialGradeStr)
      ? (materialGradeStr as MaterialGrade)
      : null;

  const carbonOffset = formData.get("carbonOffset") === "on";
  const bpaFree = formData.get("bpaFree") === "on";
  const foodSafe = formData.get("foodSafe") === "on";
  const sustainabilityNotes = ((formData.get("sustainabilityNotes") as string) || "").trim() || null;

  return {
    recycledContentPct,
    materialGrade,
    carbonOffset,
    bpaFree,
    foodSafe,
    sustainabilityNotes,
  };
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const stockQuantity = parseInt(formData.get("stockQuantity") as string, 10);
  const unit = (formData.get("unit") as string) || null;
  const featured = formData.get("featured") === "on";
  const active = formData.get("active") === "on";
  const imageUrl = (formData.get("imageUrl") as string) || null;

  const sustainability = parseSustainabilityFields(formData);
  const slug = sku.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await prisma.product.create({
    data: {
      name,
      slug,
      sku,
      category,
      price,
      description,
      stockQuantity,
      unit,
      featured,
      active,
      imageUrl,
      ...sustainability,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const stockQuantity = parseInt(formData.get("stockQuantity") as string, 10);
  const unit = (formData.get("unit") as string) || null;
  const featured = formData.get("featured") === "on";
  const active = formData.get("active") === "on";
  const imageUrl = (formData.get("imageUrl") as string) || null;

  const sustainability = parseSustainabilityFields(formData);

  await prisma.product.update({
    where: { id },
    data: {
      name,
      sku,
      category,
      price,
      description,
      stockQuantity,
      unit,
      featured,
      active,
      imageUrl,
      ...sustainability,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/products");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  await prisma.product.update({
    where: { id },
    data: { active: false },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
