import Image from "next/image";
import React from "react";
import RecipeCard from "./RecipeCard";
export type RecipeType = {
  id: number;
  name: string;
  image: string;
};
export default async function RecipeCardList() {
  const res = await fetch(`${process.env.APP_URL}/api/recipes`);
  const recipes = await res.json();

  return (
    <div className="grid grid-cols-4 gap-12 p-4">
      {recipes.recipes.map((r: RecipeType) => (
        <RecipeCard id={r.id} name={r.name} image={r.image} key={r.id} />
      ))}
    </div>
  );
}
