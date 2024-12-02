import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userSchema";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

interface RouteParams {
    params: { id: string };
}

// find user by id
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params;

  try {
    await connectMongoDB();

    // convert id
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });
    console.log("Received ID:", id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// update user by id
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = params;

  try {
    const { name, email, image, role } = await request.json();

    await connectMongoDB();

    const updatedUser = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { name, email, image, role },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// delete user by id
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = params;

  try {
    await connectMongoDB();

    const deletedUser = await User.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Error deleting user", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}