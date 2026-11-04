import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.API}/recipes?limit=8`);
  const recipe = await res.json();
  console.log("recipe : ", recipe);
  return NextResponse.json(recipe);
}
