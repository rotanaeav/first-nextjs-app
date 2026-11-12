"use client";

import React from "react";
import useSWR from "swr";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

type SWRProduct = {
  id: number | string;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  category?: string;
};

export default function ProductCardComponent() {
  const { data, error, isLoading } = useSWR("/api/productSwr", fetcher);

  if (error) {
    return (
      <div className="p-8 text-center text-destructive bg-destructive/10 rounded-2xl border border-destructive/20">
        <p className="font-semibold">Failed to load products from /api/productSwr</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm">Fetching from <code>GET /api/productSwr</code> via useSWR...</p>
      </div>
    );
  }

  const products: SWRProduct[] = data?.products ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SWR Data Fetching</h2>
          <p className="text-muted-foreground text-xs">
            Client-side cache revalidation fetching from <code>/api/productSwr</code>
          </p>
        </div>
        <span className="text-xs font-mono bg-muted text-muted-foreground px-3 py-1 rounded-full w-fit">
          {products.length} products loaded
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/productSwr/${p.id}`}
            className="group block"
          >
            <Card className="overflow-hidden gap-0 py-0 border-border/60 hover:border-primary/50 transition-all hover:shadow-lg h-full flex flex-col justify-between">
              <div>
                {p.thumbnail && (
                  <div className="relative w-full h-44 overflow-hidden bg-muted">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-1">
                      {p.title}
                    </CardTitle>
                  </div>
                  {p.description && (
                    <CardDescription className="line-clamp-2 text-xs">
                      {p.description}
                    </CardDescription>
                  )}
                </CardHeader>
              </div>

              <CardFooter className="p-4 pt-2 flex items-center justify-between border-t border-border/40 mt-auto">
                <span className="font-bold text-lg text-foreground">
                  ${p.price}
                </span>
                <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:underline">
                  Manage <ArrowRight className="size-3" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
