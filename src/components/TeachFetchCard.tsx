import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full h-56 bg-muted">
        <Image
          src={images[0]}
          fill
          alt={title}
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {category}
          </span>
          <span className="font-bold text-lg">${price}</span>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
