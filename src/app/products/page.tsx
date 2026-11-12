"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/search/SearchBar";
import CreateProductDialog from "@/components/product/CreateProductDialog";
import { Product } from "@/lib/product";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchProducts = useCallback(async (query: string = "") => {
    try {
      setLoading(true);
      const url = query ? `/api/products?query=${encodeURIComponent(query)}` : "/api/products";
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 250);
    return () => clearTimeout(timer);
  }, [search, fetchProducts]);

  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showNotification("success", `Product "${newProduct.title}" created via POST /api/products!`);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      showNotification("success", `Deleted "${title}" via DELETE /api/products/${id}`);
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Connected to <code>/api/products</code> (Live Search, Create, Update, and Delete).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <CreateProductDialog onProductCreated={handleProductCreated} />
        </div>
      </div>

      {notification && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-2 text-sm border animate-in fade-in duration-200 ${
            notification.type === "success"
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
              : "bg-destructive/10 text-destructive border-destructive/20"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Filter products via GET /api/products?query=..."
        />
      </div>

      {loading && products.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm">Calling GET /api/products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center border border-dashed rounded-2xl p-8">
          <p className="text-muted-foreground text-sm">No products found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id || product.title}
              href={`/products/${product.id || product.title}`}
              className="block transition-transform hover:-translate-y-1"
            >
              <ProductCard
                id={product.id}
                title={product.title}
                image={product.image}
                description={product.description}
                price={product.price}
                deleting={deletingId === product.id}
                onDelete={() => handleDelete(product.id || product.title, product.title)}
              />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
