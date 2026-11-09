import Image from "next/image";
import React from "react";
import RecipeCard, { RecipeType } from "./RecipeCard";

export default async function RecipeCardList() {
  const res = await fetch(`${process.env.APP_URL}/api/recipes`);
  const recipes = await res.json();


  return (
    <div className="grid grid-cols-4 gap-12 p-4">
      {recipes.recipes.map((r: RecipeType) => (
// already distructure the props so can give as obj
        <RecipeCard recipe={r} key={r.id} />
      ))}
    </div>
  );
}
