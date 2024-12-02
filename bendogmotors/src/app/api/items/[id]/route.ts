import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  await connectMongoDB();

  try {
    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching item", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const {
    title,
    description,
    price,
    makeModel,
    year,
    fuel,
    mpg,
    mileage,
    horsepower,
    engine,
    interiorColor,
    exteriorColor,
    features,
    image,
  } = await request.json();

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        makeModel,
        year,
        fuel,
        mpg,
        mileage,
        horsepower,
        engine,
        interiorColor,
        exteriorColor,
        features,
        image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Item updated successfully", updatedItem },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error updating item", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error deleting item", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
