import { NextRequest, NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/product";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { error: `Product with identifier '${id}' not found` },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Update body cannot be empty" },
        { status: 400 },
      );
    }

    const updated = updateProduct(id, body);

    if (!updated) {
      return NextResponse.json(
        { error: `Product with identifier '${id}' not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: `Product '${id}' updated successfully`,
      product: updated,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const success = deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        { error: `Product with identifier '${id}' not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: `Product '${id}' deleted successfully`,
      deletedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
