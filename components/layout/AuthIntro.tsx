import React from "react";
import ThemeToggle from "../ui/ThemeToggle";
import Image from "next/image";

const AuthIntro = () => {
  return (
    <aside className="max-lg:from-secondary max-lg:to-background relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden bg-linear-to-b px-5 py-6 lg:h-[94vh] lg:justify-between lg:rounded-xl lg:py-10">
      {/* Overlay for large screen */}
      <span className="bg-accent absolute -top-20 -left-20 -z-10 hidden size-80 rounded-full blur-[400px] lg:block"></span>
      <span className="bg-accent absolute -right-20 -bottom-20 -z-10 hidden size-90 rounded-full blur-[400px] lg:block"></span>
      <div className="absolute top-1/2 right-3 max-lg:-translate-y-1/2 lg:top-3">
        <ThemeToggle />
      </div>
      <h2 className="from-primary to-text/50 font-chillax bg-linear-to-br bg-clip-text font-bold text-transparent capitalize max-lg:text-[min(3vw,32px)] lg:block lg:max-w-md lg:place-self-start lg:text-[55px]">
        Find you flow in Chinese with <br className="hidden lg:inline" /> Yì 意 Flow
      </h2>
      <Image
        src="/logo.png"
        alt="Authentication Illustration"
        width={52}
        height={52}
        className="absolute top-1/2 left-3 -translate-y-1/2 lg:hidden"
      />
      <Image
        src="/logo.png"
        alt="Authentication Illustration"
        width={200}
        height={200}
        className="hidden lg:block"
      />

      <p className="text-4 font-chillax hidden max-w-2xs text-center italic lg:block lg:place-self-end lg:text-right">
        A modern way to study Chinese - with the power of AI and vocabulary definitions
      </p>
    </aside>
  );
};

export default AuthIntro;
