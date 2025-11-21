import User from "@/database/models/user.model";
import connectDB from "@/lib/mongodb";
import { UserSchema } from "@/lib/validation/validation";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    await connectDB();

    const EmailSchema = UserSchema.pick({ email: true });
    EmailSchema.parse({ email });

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}
