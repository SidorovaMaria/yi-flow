import { auth } from "@/auth";
import AuthIntro from "@/components/layout/AuthIntro";

import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  console.log("AuthLayout session:", session);

  return (
    <main className="grid grid-cols-1 gap-11 lg:m-[3vh] lg:grid-cols-2 lg:gap-5">
      <AuthIntro />
      {children}
    </main>
  );
};

export default AuthLayout;
