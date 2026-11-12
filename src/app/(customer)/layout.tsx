import Link from "next/link";
import React from "react";
import { User, ShieldCheck } from "lucide-react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="border-b border-border pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Customer Portal</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Demonstrating Next.js <strong>Route Groups</strong> `(customer)` with a shared nested layout.
        </p>

        <nav className="flex gap-4 mt-6">
          <Link
            href="/account"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors"
          >
            <User className="size-4" /> Account Details
          </Link>
          <Link
            href="/info"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors"
          >
            <ShieldCheck className="size-4" /> Personal Info
          </Link>
        </nav>
      </div>

      <section>{children}</section>
    </div>
  );
}
