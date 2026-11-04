import { Params } from "next/dist/server/request/params";
import React from "react";

export default function page({ param }: { param: Promise<{ id: string }> }) {
  return <div>page</div>;
}
