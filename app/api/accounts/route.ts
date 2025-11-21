import Account from "@/database/models/account.model";
import connectDB from "@/lib/mongodb";
import { AccountSchema } from "@/lib/validation/validation";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const accounts = await Account.find();
    return NextResponse.json({ success: true, data: accounts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch accounts," },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    //If not patse will throw error
    const validAccount = AccountSchema.parse(body);
    const existingAccount = await Account.findOne({
      provider: validAccount.provider,
      providerAccountId: validAccount.providerAccountId,
    });
    if (existingAccount) {
      throw new Error("Account already exists");
    }
    const newAccount = await Account.create(validAccount);
    return NextResponse.json({ success: true, data: newAccount }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to create account" },
      { status: 500 }
    );
  }
}
