import React from "react";
import { RecipeType } from "./RecipeCardList";
import Image from "next/image";

export default function RecipeCard(r: RecipeType) {
  return (
    // key={r.id}
    <div className="flex flex-col gap-2">
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
  );
}
