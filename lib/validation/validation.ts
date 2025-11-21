import z from "zod";
export const AccountSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  username: z.string().min(1, "Username is required"),
  image: z.url("Invalid URL").optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, "Provider is required"),
  providerAccountId: z.string().min(1, "Provider Account ID is required"),
});
export const UserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email address"),
  image: z.url("Invalid URL").optional(),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google"]),
  providerAccountId: z.string().min(1, "Provider account ID is required"),
  user: z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
    image: z.url("Invalid image URL").optional(),
  }),
});
export const SignInSchema = z.object({
  email: z
    .email({ message: "Please provide a valid email address." })
    .min(1, { message: "Email is required." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});
export const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .max(30, { message: "Username cannot exceed 30 characters." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
      }),

    email: z
      .email({ message: "Please provide a valid email address." })
      .min(1, { message: "Email is required." }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password cannot exceed 100 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
