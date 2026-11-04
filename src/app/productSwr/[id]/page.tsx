'use client'
import ProductId from "@/components/product/ProductCardId";
import { Suspense, use } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } =  use(params);

  return (
      <ProductId id={id} />
  );
  // return <h1>{id}</h1>
}
