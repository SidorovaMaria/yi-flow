"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/atoms/Button";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  link: string;
  linkTexts: string[];
};
const AuthShell = ({
  title,
  subtitle,
  children,
  className,
  link,
  linkTexts,
}: AuthShellProps) => {
  const handleSignIn = async () => {
    try {
      toast.success("Signed in with Google");
      await signIn(
        "google",
        {
          callbackUrl: "/",
          redirect: true,
        },
        1000
      );
    } catch {
      toast.error("Error signing in with Google");
    }
  };
  return (
    <div className="bg-bg px- flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <div className={cn("", className)}>
          <div className="mb-6 space-y-3 text-left">
            <h1 className="text-text text-[min(6vw,28px)] font-semibold">{title}</h1>
            {subtitle ? (
              <p className="text-text-muted text-[14px] leading-5">{subtitle}</p>
            ) : null}
          </div>
          {/* Login or Sing Up Form Goes Here */}
          {children}
          <div className="my-6 flex items-center gap-2">
            <hr className="bg-bg-muted w-full" /> or <hr className="bg-bg-muted w-full" />
          </div>
          <Button variant="outline" className="w-full" onClick={() => handleSignIn()}>
            <Image src="/icons/google.svg" alt="Google icon" width={20} height={20} />{" "}
            Continue with Google
          </Button>
          <p className="text-text-alt mt-6 text-center text-sm font-semibold">
            {linkTexts[0]}
            <Link href={link} className="text-primary hover:underline">
              {linkTexts[1]}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
