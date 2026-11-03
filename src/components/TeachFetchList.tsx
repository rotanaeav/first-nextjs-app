"use client";
import React, { use } from "react";
import TeachFetch, { ProductResponse } from "./TeachFetchCard";

export default function TeachFetchList({
  products,
}: {
  products: Promise<ProductResponse[]>;
}) {
  const productList = use(products);
  return (
    <div>
      {productList.map((p) => (
        <TeachFetch
          key={p.id}
          title={p.title}
          description={p.description}
          price={p.price}
          images={p.images}
          category={p.category}
        />
      ))}
    </div>
  );
}
