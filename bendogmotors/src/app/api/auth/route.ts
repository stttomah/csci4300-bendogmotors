import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userSchema";
import bcrypt from "bcrypt";

// Handle user registration
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);

    // Properly handle unknown type for `error`
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error registering user", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Error registering user", error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

// Handle user login
export async function GET(request: NextRequest) {
    try {
      const url = new URL(request.url);
      const email = url.searchParams.get("email");
      const password = url.searchParams.get("password");
  
      if (!email || !password) {
        return NextResponse.json(
          { message: "Email and password are required" },
          { status: 400 }
        );
      }
  
      await connectMongoDB();
  
      const user = await User.findOne({ email });
      if (!user || !user.password) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 }
        );
      }
  
      console.log("Plaintext Password:", password);
      console.log("Hashed Password from DB:", user.password);
  
      // Compare the plaintext password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 }
        );
      }
  
      return NextResponse.json(
        { message: "Login successful", user },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during login:", error);
  
      if (error instanceof Error) {
        return NextResponse.json(
          { message: "Error during login", error: error.message },
          { status: 500 }
        );
      }
  
      return NextResponse.json(
        { message: "Error during login", error: "Unknown error occurred" },
        { status: 500 }
      );
    }
}  