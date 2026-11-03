import Image from "next/image";
import React from "react";
export interface ProductResponse {
  id?: number;
  images: string[];
  title: string;
  description: string;
  category: string;
  price: number;
}

export default function TeachFetch({
  images,
  title,
  description,
  category,
  price,
}: ProductResponse) {
  return (
    <div>
      <Image src={images[0]} width={300} height={300} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="text-red-100">{category}</p>
      <p>{price}</p>
    </div>
  );
}
