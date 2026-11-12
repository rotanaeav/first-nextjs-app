import Link from "next/link";
import Image from "next/image";
import { photos } from "@/lib/photo";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PhotoPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Photo Gallery</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Click any photo to open it in an <strong>intercepted modal</strong> (parallel route).
          If you refresh the page or open in a new tab, it renders the <strong>full standalone page</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/photo/${photo.id}`}
            className="group block"
          >
            <Card className="overflow-hidden gap-0 py-0 border-border/60 hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="relative w-full h-56 overflow-hidden bg-muted">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {photo.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  Photo by {photo.author} • {photo.location}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
