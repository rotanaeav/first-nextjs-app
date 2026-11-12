"use client";

import React, { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/product";

interface CreateProductDialogProps {
  onProductCreated: (product: Product) => void;
}

export default function CreateProductDialog({
  onProductCreated,
}: CreateProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const priceNum = parseFloat(price);
    if (!title.trim() || isNaN(priceNum) || priceNum <= 0) {
      setError("Please provide a valid product title and price.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          price: priceNum,
          description: description.trim(),
          image: image.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create product");
      }

      onProductCreated(data.product);
      setTitle("");
      setPrice("");
      setDescription("");
      setImage("");
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="gap-2 shadow-sm">
        <Plus className="size-4" /> Add New Product
      </Button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget && !loading) setIsOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={loading}
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </Button>

            <div className="mb-5">
              <h2 className="text-xl font-bold tracking-tight">Create New Product</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Submits a <code>POST /api/products</code> request with body validation.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Product Title *
                </label>
                <Input
                  required
                  placeholder="e.g. Truffle Smash Burger"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Price ($) *
                </label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="e.g. 14.50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Description
                </label>
                <Input
                  placeholder="e.g. Double patty with black truffle aioli..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">
                  Image URL (optional)
                </label>
                <Input
                  placeholder="https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="gap-2">
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  {loading ? "Creating..." : "Create Product (POST)"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
