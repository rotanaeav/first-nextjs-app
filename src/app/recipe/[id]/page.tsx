export const instant = false;

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRecipe } from "@/lib/recipe";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Flame, Star, Utensils } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipe(id);
  if (!recipe) return { title: "Recipe Not Found" };
  return {
    title: `${recipe.name} - Recipe Details`,
    description: `Learn how to make ${recipe.name}. ${recipe.cuisine} cuisine with ${recipe.difficulty} difficulty.`,
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" size="sm" render={<Link href="/recipe" />} nativeButton={false}>
          <ArrowLeft className="mr-2 size-4" /> Back to Recipes
        </Button>
      </div>

      <div className="space-y-8">
        <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden bg-muted shadow-lg">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {recipe.name}
            </h1>
            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
              Full Standalone Page
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Utensils className="size-4" />
              <span>{recipe.cuisine} Cuisine</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="size-4" />
              <span>Prep: {recipe.prepTimeMinutes}m • Cook: {recipe.cookTimeMinutes}m</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Flame className="size-4" />
              <span>{recipe.caloriesPerServing} kcal</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500 font-semibold">
              <Star className="size-4 fill-amber-500" />
              <span>{recipe.rating} ({recipe.reviewCount ?? 15} reviews)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Step-by-Step Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-bold text-primary shrink-0">
                      {i + 1}.
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
