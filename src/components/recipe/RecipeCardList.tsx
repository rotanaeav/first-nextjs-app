import Image from "next/image";
import React from "react";
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
        <div key={r.id} className="flex flex-col gap-2">
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={r.image}
              alt={r.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              // width={250}
              // height={250}
              loading="eager"
              className="object-fill"
            />
          </div>
          <h4 className="text-2xl">{r.name}</h4>
        </div>
      ))}
    </div>
  );
}
