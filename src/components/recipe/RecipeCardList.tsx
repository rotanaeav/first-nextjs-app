import React from "react";
import RecipeCard, { RecipeType } from "./RecipeCard";

export default async function RecipeCardList() {
  const apiBase = process.env.API || "https://dummyjson.com";
  const res = await fetch(`${apiBase}/recipes?limit=8`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const recipes: RecipeType[] = data.recipes ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {recipes.map((r: RecipeType) => (
        <RecipeCard recipe={r} key={r.id} />
      ))}
    </div>
  );
}
