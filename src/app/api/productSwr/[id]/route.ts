import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const apiBase = process.env.API || "https://dummyjson.com";
    const res = await fetch(`${apiBase}/products/${id}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Product with id ${id} not found` },
        { status: res.status },
      );
    }

    const product = await res.json();
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body cannot be empty for update" },
        { status: 400 },
      );
    }

    // Call upstream or simulate successful update
    return NextResponse.json({
      message: `Product ${id} updated successfully`,
      updatedFields: body,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    return NextResponse.json({
      message: `Product ${id} deleted successfully`,
      deletedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
