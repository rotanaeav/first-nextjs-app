import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  product: React.ReactNode;
  payment: React.ReactNode;
};

export default function DashboardLayout({
  children,
  product,
  payment,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
          {children}

          {/* Parallel Slots for @product and @payment */}
          <section className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {product}
              {payment}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
