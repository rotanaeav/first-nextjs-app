"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Products, Product, deleteProduct } from "@/lib/product";
import SearchBar from "@/components/search/SearchBar";
import CreateProductDialog from "@/components/product/CreateProductDialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, Trash2, ExternalLink, CheckCircle2 } from "lucide-react";

export default function DashboardProductPage() {
  const [productList, setProductList] = useState<Product[]>(Products);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = productList.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreated = (newProduct: Product) => {
    setProductList((prev) => [newProduct, ...prev]);
    setNotification(`Product "${newProduct.title}" added to inventory!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}" from inventory?`)) return;
    deleteProduct(id);
    setProductList((prev) => prev.filter((p) => p.id !== id));
    setNotification(`Deleted "${title}" from inventory.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/50">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Product Inventory</h1>
          </div>
        </div>

        <CreateProductDialog onProductCreated={handleCreated} />
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search and Filter */}
      <Card>
        <CardHeader className="pb-3">
          {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4"> */}
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search products by title..."
              className="w-full md:w-80"
            />
          {/* </div> */}
        </CardHeader>

        <CardContent className="p-0">
          <div className="rounded-b-2xl overflow-hidden border-t border-border">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title & Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="w-24 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground text-sm">
                      No products found matching "{search}".
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((product) => (
                    <TableRow key={product.id || product.title} className="hover:bg-muted/30">
                      <TableCell className="p-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="size-12 rounded-lg object-cover bg-muted"
                        />
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-sm">{product.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                          {product.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          In Stock
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-bold text-sm">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            render={<Link href={`/products/${product.id || product.title}`} />}
                            nativeButton={false}
                            title="View in storefront"
                          >
                            <ExternalLink className="size-3.5 text-muted-foreground hover:text-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleDelete(product.id || product.title, product.title)}
                            className="text-destructive hover:bg-destructive/10"
                            title="Delete product"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
