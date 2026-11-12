"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Products } from "@/lib/product";
import SearchBar from "@/components/search/SearchBar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ProductParallelSlot() {
  const [search, setSearch] = useState("");

  const filtered = Products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-4 border-border h-full flex flex-col justify-between">
      <div>
        <CardHeader className="p-2 pb-4 space-y-3">
          <CardTitle className="text-xl font-bold">Products</CardTitle>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search products..."
            className="w-full max-w-full"
          />
        </CardHeader>

        <CardContent className="p-2 space-y-2.5 max-h-[460px] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No products found.
            </p>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id || p.title}
                className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="size-11 rounded-lg object-cover bg-muted shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                      {p.description}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-sm shrink-0 pl-3">
                  ${p.price.toFixed(2)}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </div>

      <CardFooter className="p-2 pt-3 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
        <span>{filtered.length} products</span>
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/dashboard/product" />}
          nativeButton={false}
          className="gap-1 text-primary hover:text-primary"
        >
          View all <ArrowRight className="size-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
