"use server";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { ZodError, ZodType } from "zod";
import connectDB from "../mongodb";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodType<T>;
  authorize?: boolean;
};

export async function performAction<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  console.log("Performing action with params:", params);
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          success: false,
          error: {
            message: "Schema validation failed",
            details: error.issues,
          },
          status: 400,
        };
      } else {
        console.error("Unexpected error during schema validation:", error);
        return new Error("Schema validation failed");
      }
    }
  }
  let session: Session | null = null;
  if (authorize) {
    session = await auth();

    if (!session) {
      return {
        success: false,
        error: {
          message: "Unauthorized",
        },
        status: 401,
      };
    }
  }
  await connectDB();
  return { params, session };
}
