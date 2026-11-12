export const instant = false;

import ProductId from "@/components/product/ProductCardId";
import { Suspense } from "react";

export default async function ProductSwrDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading SWR product...</div>}>
        <ProductId id={id} />
      </Suspense>
    </main>
  );
}
