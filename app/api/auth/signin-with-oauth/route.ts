import Account from "@/database/models/account.model";
import User from "@/database/models/user.model";
import connectDB from "@/lib/mongodb";
import { SignInWithOAuthSchema } from "@/lib/validation/validation";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { ZodError } from "zod";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();

  await connectDB();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    SignInWithOAuthSchema.parse({
      provider,
      providerAccountId,
      user,
    });

    const { username, email, image } = user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingUser = await User.findOne({ email }).session(session);

    if (!existingUser) {
      [existingUser] = await User.create(
        [{ username: slugifiedUsername, email, image }],
        { session }
      );
    } else {
      const updatedData: { username?: string; image?: string } = {};
      if (existingUser.username !== slugifiedUsername)
        updatedData.username = slugifiedUsername;
      if (existingUser.image !== image) updatedData.image = image;

      if (Object.keys(updatedData).length > 0) {
        await User.updateOne({ _id: existingUser._id }, { $set: updatedData }).session(
          session
        );
      }
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            username: slugifiedUsername,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    await session.abortTransaction();
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid data format", errors: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message || "Failed to sign in with OAuth",
      },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
