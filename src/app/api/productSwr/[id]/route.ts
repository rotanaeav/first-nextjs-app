import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params:Promise<{id:string}>}) {
  const { id } = await params
  
  const res = await fetch(`${process.env.API}/products/${id}`);
  const products = await res.json();
  
  return NextResponse.json(products);
}
