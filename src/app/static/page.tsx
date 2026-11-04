import StaticTest from "@/components/StaticTest";
import React, { Suspense } from "react";
// use revalidate to auto rerender after build
// export const revalidate = 5
export default function Page() {
  return (
    <Suspense>
      <StaticTest />
    </Suspense>
  );
}
