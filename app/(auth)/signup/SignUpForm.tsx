"use client";
import { SignUpSchema } from "@/lib/validation/validation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/ui/atoms/InputField";
import { Button } from "@/components/ui/atoms/Button";
import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

type SignUpInput = z.input<typeof SignUpSchema>;
type SignUpOutput = z.output<typeof SignUpSchema>;
const SignUpForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput, SignUpOutput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onSubmit = async (data: SignUpInput) => {
    const result = await signUpWithCredentials(data);
    if (result.success) {
      router.push("/");
      toast.success("Sign up successful!");
    } else {
      toast.error(`Sorry, ${result.error?.message || "Unknown error"}`);
    }
  };
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex flex-col gap-4">
      <InputField
        label="Username"
        type="text"
        placeholder="Enter your username"
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
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
        type={showPassword ? "text" : "password"}
        icon={
          showPassword ? (
            <EyeClosed
              onClick={togglePasswordVisibility}
              className="cursor-pointer opacity-80 hover:opacity-100"
            />
          ) : (
            <Eye
              onClick={togglePasswordVisibility}
              className="cursor-pointer opacity-80 hover:opacity-100"
            />
          )
        }
        iconPosition="right"
        placeholder="Enter your password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <InputField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        icon={
          showConfirmPassword ? (
            <EyeClosed
              onClick={toggleConfirmPasswordVisibility}
              className="cursor-pointer opacity-80 hover:opacity-100"
            />
          ) : (
            <Eye
              onClick={toggleConfirmPasswordVisibility}
              className="cursor-pointer opacity-80 hover:opacity-100"
            />
          )
        }
        iconPosition="right"
        placeholder="Confirm your password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button
        type="submit"
        disabled={isSubmitting || hasErrors}
        fullWidth
        variant="outline"
      >
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
