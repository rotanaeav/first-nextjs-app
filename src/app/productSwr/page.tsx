import ProductCardComponent from "@/components/product/ProductCardComponent";
import React, { Suspense } from "react";

export default function ProductSwrPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading...</div>}>
        <ProductCardComponent />
      </Suspense>
    </main>
  );
}
