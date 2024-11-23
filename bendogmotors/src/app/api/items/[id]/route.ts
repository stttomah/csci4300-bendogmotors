import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params; 
  await connectMongoDB();

  try {
    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching item", error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params; 
    
    console.log("Received ID:", id);
  
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
      image,
    } = await request.json(); 
  
    console.log("Update Data:", {
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
      image,
    });
  
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
  
    await connectMongoDB();
    console.log("Connected to MongoDB");
  
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
  
      console.log("Updated Item:", updatedItem);
  
      if (!updatedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Item updated successfully", updatedItem }, { status: 200 });
    } catch (error) {
      console.error("Error updating item:", error);
      return NextResponse.json({ message: "Error updating item", error }, { status: 500 });
    }
  }  

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params; 
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await connectMongoDB();

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting item", error }, { status: 500 });
  }
}
