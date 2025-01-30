import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/model/user";
import { MongoDb_String } from "@/app/lib/db";

export async function POST(req) {
  try {
    // Parse the request body.
    const { name, email, password } = await req.json();

    // Validate input fields.
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    // Hash the password.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the database.
    await MongoDb_String();

    // Create the user.
    await User.create({ name, email, password: hashedPassword });

    // Return a success response.
    return NextResponse.json(
      { message: "User successfully registered." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while registering the user:", error);

    // Return an error response.
    return NextResponse.json(
      {
        error: "An error occurred while registering the user.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
