export const instant = false;

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { photos } from "@/lib/photo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const photo = photos.find((p) => p.id === id);
  if (!photo) return { title: "Photo Not Found" };
  return {
    title: `${photo.title} - Photo Gallery`,
    description: photo.description,
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" size="sm" render={<Link href="/photo" />} nativeButton={false}>
          <ArrowLeft className="mr-2 size-4" /> Back to Gallery
        </Button>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden bg-card text-card-foreground shadow-lg">
        <div className="relative w-full h-[450px] sm:h-[550px] bg-muted">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <div className="p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{photo.title}</h1>
            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
              Full Standalone Page
            </span>
          </div>

          <p className="text-muted-foreground">
            Photograph by <span className="font-semibold text-foreground">{photo.author}</span>
            {photo.location ? ` in ${photo.location}` : ""}
          </p>

          <p className="text-base leading-relaxed">{photo.description}</p>

          {photo.camera && (
            <div className="pt-4 border-t border-border/60 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Camera settings:</span> {photo.camera}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
