"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

  const recycledContentPctStr = formData.get("recycledContentPct") as string;
  const recycledContentPct = recycledContentPctStr ? parseInt(recycledContentPctStr, 10) : null;
  const materialGradeStr = formData.get("materialGrade") as string;
  const materialGrade = materialGradeStr ? materialGradeStr as any : null;
  const carbonOffset = formData.get("carbonOffset") === "on";
  const bpaFree = formData.get("bpaFree") === "on";
  const foodSafe = formData.get("foodSafe") === "on";
  const sustainabilityNotes = (formData.get("sustainabilityNotes") as string) || null;
  
  // Basic slugification of name or sku
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
      recycledContentPct,
      materialGrade,
      carbonOffset,
      bpaFree,
      foodSafe,
      sustainabilityNotes,
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

  const recycledContentPctStr = formData.get("recycledContentPct") as string;
  const recycledContentPct = recycledContentPctStr ? parseInt(recycledContentPctStr, 10) : null;
  const materialGradeStr = formData.get("materialGrade") as string;
  const materialGrade = materialGradeStr ? materialGradeStr as any : null;
  const carbonOffset = formData.get("carbonOffset") === "on";
  const bpaFree = formData.get("bpaFree") === "on";
  const foodSafe = formData.get("foodSafe") === "on";
  const sustainabilityNotes = (formData.get("sustainabilityNotes") as string) || null;

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
      recycledContentPct,
      materialGrade,
      carbonOffset,
      bpaFree,
      foodSafe,
      sustainabilityNotes,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/products");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  // Instead of hard deleting, we'll just deactivate it
  // Soft delete prevents orphaned order items
  await prisma.product.update({
    where: { id },
    data: { active: false },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
