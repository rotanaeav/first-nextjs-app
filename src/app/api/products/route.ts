import { NextRequest, NextResponse } from "next/server";
import { Products, addProduct } from "@/lib/product";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query") || searchParams.get("search");

    let results = Products;
    if (query) {
      const q = query.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    return NextResponse.json({
      total: results.length,
      products: results,
      query: query ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const priceNum = typeof body.price === "number" ? body.price : parseFloat(body.price);

    if (!body.title || isNaN(priceNum)) {
      return NextResponse.json(
        { error: "Validation failed: 'title' and numeric 'price' are required" },
        { status: 400 },
      );
    }

    const created = addProduct({
      title: body.title,
      description: body.description ?? "",
      image:
        body.image ||
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      price: priceNum,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: created,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }
}
