import React from "react";
type layoutProops = {
  children: React.ReactNode;
  products: React.ReactNode;
};

export default function DashboardLayout({ children, products }: layoutProops) {
  return (
    <div>
      {children}
      {products}
    </div>
  );
}
