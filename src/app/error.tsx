"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[50vh]">
      <Card className="max-w-md w-full border-destructive/30 bg-destructive/5 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto size-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2">
            <AlertTriangle className="size-6" />
          </div>
          <CardTitle className="text-xl text-destructive">
            Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>{error.message || "An unexpected error occurred while rendering this page."}</p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/70 mt-2 font-mono">
              Error Digest: {error.digest}
            </p>
          )}
        </CardContent>
        <CardFooter className="justify-center pt-2">
          <Button
            variant="default"
            onClick={() => reset()}
            className="gap-2"
          >
            <RefreshCcw className="size-4" /> Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
