export const instant = false;

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/lib/product";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import ProductDetailActions from "@/components/product/ProductDetailActions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} - Products`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" size="sm" render={<Link href="/products" />} nativeButton={false}>
          <ArrowLeft className="mr-2 size-4" /> Back to Products
        </Button>
      </div>

      <Card className="overflow-hidden p-0 border border-border shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-72 md:h-full min-h-85 bg-muted overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Route: /api/products/{id}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {product.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-3xl font-extrabold text-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <Button className="gap-2">
                  <ShoppingBag className="size-4" /> Add to Cart
                </Button>
              </div>

              <ProductDetailActions product={product} productId={id} />
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
