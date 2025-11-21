import AuthShell from "@/components/layout/AuthShell";
import SignInForm from "./SignInForm";

export default function LoginPage() {
  // later you can wire this to react-hook-form or server actions
  return (
    <AuthShell
      title="Wecome back!"
      subtitle="Sign in to your account"
      link="/signup"
      linkTexts={["Don't have an account? ", " Sign up"]}
    >
      <SignInForm />
    </AuthShell>
  );
}
