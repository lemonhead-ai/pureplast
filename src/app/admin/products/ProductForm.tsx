"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createProduct, updateProduct } from "./actions";
import { toast } from "sonner";
import type { Product } from "@prisma/client";
import { CATEGORIES } from "@/data/products";

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      console.error("Upload error", err);
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      router.push("/admin/products");
      router.refresh();
      toast.success(product ? "Product updated successfully" : "Product created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-[#E5E5E5] max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0B1215]">Product Name</label>
          <input
            name="name"
            defaultValue={product?.name}
            required
            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm"
          />
        </div>

        {/* SKU */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0B1215]">SKU</label>
          <input
            name="sku"
            defaultValue={product?.sku}
            required
            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0B1215]">Category</label>
          <select
            name="category"
            defaultValue={product?.category || "household"}
            required
            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm appearance-none"
          >
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0B1215]">Price (KES)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product?.price}
            required
            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm"
          />
        </div>

        {/* Stock Quantity */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0B1215]">Stock Quantity</label>
          <input
            name="stockQuantity"
            type="number"
            defaultValue={product?.stockQuantity ?? 0}
            required
            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm"
          />
        </div>

        {/* Unit */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#0B1215]">Unit (Optional)</label>
          <input
            name="unit"
            defaultValue={product?.unit || ""}
            placeholder="e.g. piece, dozen, kg"
            className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-[#0B1215]">Product Image</label>
          <div className="flex items-center gap-4">
            {imageUrl && (
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/5 border border-[#E5E5E5] flex-shrink-0">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="block w-full text-sm text-black/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F5F5F2] file:text-[#0B1215] hover:file:bg-[#E5E5E5] transition-colors"
              />
              {uploadingImage && <p className="text-xs text-[#004C97] mt-2">Uploading image...</p>}
            </div>
            <input type="hidden" name="imageUrl" value={imageUrl} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#0B1215]">Description</label>
        <textarea
          name="description"
          defaultValue={product?.description || ""}
          rows={4}
          className="w-full p-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm resize-none"
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-8 border-t border-[#E5E5E5] pt-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="active"
            defaultChecked={product ? product.active : true}
            className="w-5 h-5 rounded border-[#E5E5E5] text-[#004C97] focus:ring-[#004C97]"
          />
          <div>
            <p className="text-sm font-semibold text-[#0B1215] group-hover:text-[#004C97] transition-colors">Active</p>
            <p className="text-xs text-black/50">Visible in catalog</p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured}
            className="w-5 h-5 rounded border-[#E5E5E5] text-[#004C97] focus:ring-[#004C97]"
          />
          <div>
            <p className="text-sm font-semibold text-[#0B1215] group-hover:text-[#004C97] transition-colors">Featured</p>
            <p className="text-xs text-black/50">Show on homepage</p>
          </div>
        </label>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-[#E5E5E5] pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
