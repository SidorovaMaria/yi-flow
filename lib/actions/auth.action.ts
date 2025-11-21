"use server";

import User from "@/database/models/user.model";
import { SignInSchema, SignUpSchema } from "../validation/validation";
import { performAction } from "./action";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Account from "@/database/models/account.model";
import { signIn } from "@/auth";
type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};
interface AuthCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await performAction({ params, schema: SignUpSchema });
  if (validationResult instanceof Error) {
    return {
      success: false,
      error: { message: validationResult.message },
      status: 500,
    };
  }
  const { username, email, password } = validationResult.params!;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) {
      throw new Error("Username already exists");
    }
    if (existingUsername) {
      throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, email }], {
      session,
    });
    await Account.create(
      [
        {
          userId: newUser._id,
          username: newUser.username,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );
    await session.commitTransaction();

    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return {
      success: false,
      error: { message: (error as Error).message || "Failed to sign up" },
      status: 500,
    };
  } finally {
    session.endSession();
  }
}
export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validationResult = await performAction({ params, schema: SignInSchema });
  if (validationResult instanceof Error) {
    return {
      success: false,
      error: { message: validationResult.message },
      status: 500,
    };
  }
  const { email, password } = validationResult.params!;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("We could not find an account with this email address");
    }
    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });
    if (!existingAccount) throw new Error("Account not found");
    const isPasswordValid = await bcrypt.compare(password, existingAccount.password!);
    if (!isPasswordValid) {
      throw new Error("Check your email and password and try again.");
    }
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: { message: (error as Error).message || "Failed to sign in" },
      status: 500,
    };
  }
}
