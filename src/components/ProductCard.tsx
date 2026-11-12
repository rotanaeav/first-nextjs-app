"use client";

import { Product } from "@/lib/product";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ProductCardProps extends Product {
  onDelete?: () => void;
  deleting?: boolean;
}

export default function ProductCard({
  onDelete,
  deleting,
  ...props
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-xs overflow-hidden hover:shadow-md transition-shadow relative group">
      <div className="overflow-hidden relative">
        <img
          src={props.image}
          alt={props.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {onDelete && (
          <Button
            type="button"
            variant="destructive"
            size="icon-xs"
            disabled={deleting}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-3 right-3 opacity-90 hover:opacity-100 shadow-md"
            title="Delete product via DELETE /api/products/[id]"
          >
            <Trash2 className="size-3.5" />
          </Button>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base line-clamp-1">{props.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">
          {props.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between p-4 pt-2 border-t border-border/50">
        <span className="text-lg font-bold tracking-tight">
          ${props.price.toFixed(2)}
        </span>
        <Button size="xs" variant="outline">Details</Button>
      </CardFooter>
    </Card>
  );
}
