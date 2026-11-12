export const instant = false;

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Modal from "@/components/Modal";
import { getRecipe } from "@/lib/recipe";

async function RecipeModalContent({
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
    <div className="space-y-4">
      <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-muted">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{recipe.name}</h2>
          <span className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full">
            Intercepted Route
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-2">
          <span className="bg-secondary px-2 py-0.5 rounded-md font-medium text-secondary-foreground">
            {recipe.cuisine}
          </span>
          <span className="bg-secondary px-2 py-0.5 rounded-md font-medium text-secondary-foreground">
            {recipe.difficulty}
          </span>
          <span>⏱️ Prep: {recipe.prepTimeMinutes}m</span>
          <span>🔥 Cook: {recipe.cookTimeMinutes}m</span>
          <span>⭐ {recipe.rating}</span>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-sm">Ingredients:</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-0.5">
            {recipe.ingredients.slice(0, 5).map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
            {recipe.ingredients.length > 5 && (
              <li className="text-xs italic">
                + {recipe.ingredients.length - 5} more ingredients
              </li>
            )}
          </ul>
        </div>

        <div className="mt-3">
          <h3 className="font-semibold text-sm">Quick Instructions:</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
            {recipe.instructions.join(" ")}
          </p>
        </div>
      </div>
    </div>
  );
}

function RecipeModalSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-64 sm:h-72 rounded-xl bg-muted" />
      <div className="h-7 w-2/3 bg-muted rounded-md" />
      <div className="h-4 w-1/2 bg-muted rounded-md" />
      <div className="space-y-2 pt-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-4/5 bg-muted rounded" />
      </div>
    </div>
  );
}

export default function RecipeModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Modal>
      <Suspense fallback={<RecipeModalSkeleton />}>
        <RecipeModalContent params={params} />
      </Suspense>
    </Modal>
  );
}
