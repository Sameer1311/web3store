import { NextResponse } from "next/server";
import User from "@/app/model/user";
import { MongoDb_String } from "@/app/lib/db";

export async function POST(req) {
  try {
    // Ensure the database is connected.
    await MongoDb_String();

    // Parse the email from the request body.
    const { email } = await req.json();

    // Find the user and convert it to a plain JavaScript object.
    const user = await User.findOne({ email }).select("_id").lean();

    // Return a proper JSON response.
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in POST handler:", error);

    // Return an error response in case of failure.
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
