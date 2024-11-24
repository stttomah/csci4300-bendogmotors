import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    await connectMongoDB();
  
    try {
      const data = await request.json();
      console.log("Received Payload:", data);
  
      const {
        title,
        description,
        price,
        makeModel,
        year,
        fuel,
        mpg,
        interiorColor,
        exteriorColor,
        features,
        linkurl, 
      } = data;
  
      const newItem = await Item.create({
        title,
        description,
        price,
        makeModel,
        year,
        fuel,
        mpg,
        interiorColor,
        exteriorColor,
        features,
        image: linkurl, 
      });
  
      console.log("Saved Item:", newItem);
  
      return NextResponse.json(
        { message: "Item added successfully", item: newItem },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error saving item:", error);
  
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
  
      return NextResponse.json(
        { message: "Failed to save item", error: errorMessage },
        { status: 500 }
      );
    }
  }

export async function GET() {
  await connectMongoDB();

  try {
    const items = await Item.find();
    console.log("Fetched Items:", items);

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";

    return NextResponse.json(
      { message: "Failed to fetch items", error: errorMessage },
      { status: 500 }
    );
  }
}
