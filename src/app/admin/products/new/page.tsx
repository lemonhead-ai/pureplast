import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0B1215]">Add New Product</h1>
        <p className="text-sm text-black/50 mt-1">Create a new product in the catalog</p>
      </div>
      <ProductForm />
    </div>
  );
}
