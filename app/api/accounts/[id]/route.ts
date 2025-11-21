import Account from "@/database/models/account.model";
import connectDB from "@/lib/mongodb";
import { AccountSchema } from "@/lib/validation/validation";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Account ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const account = await Account.findById(id);
    if (!account) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    console.error("Error fetching account:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch account" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Account ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete account" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { success: false, message: "Account ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const body = await request.json();
    const validatedData = AccountSchema.partial().parse(body);

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { $set: validatedData },
      { new: true }
    );
    if (!updatedAccount) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedAccount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to update account" },
      { status: 500 }
    );
  }
}
