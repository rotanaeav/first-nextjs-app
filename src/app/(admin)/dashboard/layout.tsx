import React from "react";
type layoutProops = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: layoutProops) {
  return <div>{children}</div>;
}
