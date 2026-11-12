"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "Products",
    href: "/dashboard/product",
    icon: Package,
    exact: false,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
    exact: false,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const isItemActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card/60 backdrop-blur-md flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-border flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs">
            <Shield className="size-4" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-sm block">Admin Console</span>
            <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest block">Dashboard</span>
          </div>
        </div>

        {/* Navigation items */}
        <div className="p-4 space-y-1.5">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const active = isItemActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
                  active
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("size-4 shrink-0 transition-transform group-hover:scale-110", active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer / Return link */}
      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to Storefront
        </Link>
      </div>
    </aside>
  );
}
