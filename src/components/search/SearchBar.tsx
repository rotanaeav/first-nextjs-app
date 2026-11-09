"use client";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";

export default function SearchBar() {
  const router = useRouter();
  return (
    <div>
      <div>SearchBar</div>

      <button onClick={() => router.push("/")} className="cursor-pointer p-4">
        Click
      </button>
    </div>
  );
}
