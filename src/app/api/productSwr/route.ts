//route api support : NextResponse and NextRequest

import { NextResponse } from "next/server";

// Method support : GET(read) , POST(Update, Delete,Create)
export async function GET() {
  // logic :
  const res = await fetch(`${process.env.API}/products`);
  const products = await res.json();
  console.log("Product : ", products);

  return NextResponse.json(products);
}

