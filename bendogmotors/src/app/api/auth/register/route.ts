import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userSchema";
import bcrypt from "bcrypt";

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

    // check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // has password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // create/store new user
    const newUser = await User.create({
      name,
      email: email.toLowerCase(), // normalize email
      password: hashedPassword,   // store hashed password
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { email: newUser.email, name: newUser.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}