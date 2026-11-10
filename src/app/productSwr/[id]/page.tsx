export const instant = false
import ProductId from "@/components/product/ProductCardId";
import { Suspense, use } from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } =  await params

  return (
      <ProductId id={id} />
  );
  // return <h1>{id}</h1>
}
