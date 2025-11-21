import User from "@/database/models/user.model";
import connectDB from "@/lib/mongodb";
import { UserSchema } from "@/lib/validation/validation";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const validatedData = UserSchema.parse(body);

    const { email, username } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("Username already exists");

    const newUser = await User.create(validatedData);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create user" },
      { status: 500 }
    );
  }
}
