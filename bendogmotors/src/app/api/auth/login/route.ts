import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userSchema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", user: { email: user.email, name: user.name } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}