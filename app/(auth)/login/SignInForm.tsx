"use client";
import { SignInSchema } from "@/lib/validation/validation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/ui/atoms/InputField";
import { Button } from "@/components/ui/atoms/Button";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInWithCredentials } from "@/lib/actions/auth.action";

type SignInInput = z.input<typeof SignInSchema>;
type SignInOutput = z.output<typeof SignInSchema>;
const SignInForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput, SignInOutput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: SignInInput) => {
    const result = await signInWithCredentials(data);
    if (result.success) {
      router.push("/");
      toast.success("Sign in successful!");
    } else {
      toast.error(`Sorry, ${result.error?.message || "Unknown error"}`);
    }
  };
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex flex-col gap-4">
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        disabled={isSubmitting || hasErrors}
        fullWidth
        variant="outline"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInForm;
