import AuthShell from "@/components/layout/AuthShell";
import SignUpForm from "./SignUpForm";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your Yi-Flow account"
      subtitle="Sign up to your account"
      link="/login"
      linkTexts={["Already have an account? ", " Log in"]}
    >
      <SignUpForm />
    </AuthShell>
  );
}
