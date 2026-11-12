import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export type RecipeType = {
  id: number;
  name: string;
  image: string;
  cuisine?: string;
  rating?: number;
};

export default function RecipeCard({ recipe }: { recipe: RecipeType }) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="block group">
      <Card className="overflow-hidden gap-0 py-0 border-border/60 hover:border-primary/50 transition-all hover:shadow-lg">
        <div className="relative w-full h-60 md:h-72 overflow-hidden bg-muted">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {recipe.name}
          </CardTitle>
          {recipe.cuisine && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              {recipe.cuisine} • Rating: {recipe.rating ?? "4.5"} ★
            </p>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
