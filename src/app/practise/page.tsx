"use client";
import CartDisplay from "@/components/CartDisplay";
import React from "react";

export default function page() {
  return (
    <div>
      <CartDisplay />
      <button onClick={() => console.log("l")}>Click me</button>
    </div>
  );
}
