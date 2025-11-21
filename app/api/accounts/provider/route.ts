import Account from "@/database/models/account.model";
import connectDB from "@/lib/mongodb";
import { AccountSchema } from "@/lib/validation/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { providerAccountId } = await request.json();
  try {
    await connectDB();
    const validAccount = AccountSchema.partial().parse({ providerAccountId });
    const existingAccount = await Account.findOne({
      providerAccountId: validAccount.providerAccountId,
    });
    if (!existingAccount) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: existingAccount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message || "Failed to fetch account" },
      { status: 500 }
    );
  }
}
