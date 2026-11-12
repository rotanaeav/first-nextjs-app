"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-4 bg-gray-50 text-gray-900 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200 text-center space-y-4">
          <div className="size-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Critical Error</h2>
          <p className="text-sm text-gray-600">
            {error.message || "A critical error occurred in the root layout."}
          </p>
          <button
            onClick={() => reset()}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
