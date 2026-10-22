"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Product, Products } from "@/lib/product";

export default function CartDisplay() {
  const [items, setItems] = useState<Product[]>([]);

  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <div className="grid grid-cols-4 gap-20">
        {Products.map((product, index) => (
          <section
            key={index}
            className="w-75 overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            <img
              width={300}
              height={300}
              src={product.image}
              alt={product.title}
              className="h-50 w-full object-cover"
            />

            <div className="space-y-4 p-5">
              <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                {product.title}
              </h2>

              <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                {product.description}
              </p>

              <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
                <p className="text-xl font-bold text-gray-900">
                  ${product.price}
                </p>

                <button
                  className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 active:scale-95"
                  onClick={() => setItems([...items, product])}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
      <h2 className="text-2xl">Carts Items</h2>
      <div className="grid grid-cols-5 gap-8">
        {items.map((item, index) => (
          <ProductCard
            key={index}
            title={item.title}
            image={item.image}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
}
