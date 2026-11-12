"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, X, Loader2, CheckCircle2 } from "lucide-react";

export default function ProductDetailActions({
  product: initialProduct,
  productId,
}: {
  product: Product;
  productId: string;
}) {
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(String(product.price));
  const [description, setDescription] = useState(product.description);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const priceNum = parseFloat(price);
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: isNaN(priceNum) ? product.price : priceNum,
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      if (data.product) {
        setProduct(data.product);
      } else {
        setProduct((prev) => ({ ...prev, price: priceNum, description }));
      }
      setIsEditing(false);
      setMessage("Updated successfully via PUT /api/products/[id]!");
      setTimeout(() => setMessage(null), 3000);
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${product.title}"?`)) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");
      router.push("/products");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete");
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      {message && (
        <div className="p-3 text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="size-4" />
          <span>{message}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="gap-2"
        >
          <Edit2 className="size-3.5" /> Edit Product (PUT)
        </Button>

        <Button
          variant="destructive"
          size="sm"
          disabled={deleting}
          onClick={handleDelete}
          className="gap-2"
        >
          {deleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
          {deleting ? "Deleting..." : "Delete Product (DELETE)"}
        </Button>
      </div>

      {isEditing && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget && !loading) setIsEditing(false);
          }}
        >
          <div className="relative w-full max-w-md bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={loading}
              onClick={() => setIsEditing(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>

            <h3 className="text-lg font-bold">Edit Product</h3>
            <p className="text-xs text-muted-foreground mt-0.5 mb-4">
              Sends a <code>PUT /api/products/{productId}</code> request.
            </p>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1">Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Description</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="gap-2">
                  {loading && <Loader2 className="size-3.5 animate-spin" />}
                  {loading ? "Saving..." : "Save Changes (PUT)"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
