export const instant = false;

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Modal from "@/components/Modal";
import { photos } from "@/lib/photo";

async function PhotoModalContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photos.find((p) => p.id === id);

  if (!photo) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-muted">
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{photo.title}</h2>
          <span className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full">
            Intercepted Route
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          By {photo.author} {photo.location ? `• ${photo.location}` : ""}
        </p>
        <p className="text-sm mt-3 leading-relaxed">{photo.description}</p>
        {photo.camera && (
          <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
            📷 {photo.camera}
          </p>
        )}
      </div>
    </div>
  );
}

function PhotoModalSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-80 sm:h-96 rounded-xl bg-muted" />
      <div className="h-7 w-1/2 bg-muted rounded-md" />
      <div className="h-4 w-1/3 bg-muted rounded-md" />
    </div>
  );
}

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Modal>
      <Suspense fallback={<PhotoModalSkeleton />}>
        <PhotoModalContent params={params} />
      </Suspense>
    </Modal>
  );
}
