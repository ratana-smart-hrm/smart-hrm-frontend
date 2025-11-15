"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import LoginForm from "./LoginForm";

const LoginClient = () => {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden p-4 md:p-6">
      <Card className="relative z-10 mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/40 bg-white/85 shadow-[0_25px_80px_-20px_rgba(59,130,246,0.35)] backdrop-blur-2xl animate-card-enter animate-card-float dark:border-white/10 dark:bg-slate-900/80">
        <span aria-hidden className="card-glow" />
        <span aria-hidden className="card-sheen" />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl border border-white/60 dark:border-white/10"
        />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-center">
            <Image
              src="/sample-logo.avif"
              width={100}
              height={50}
              alt="Logo"
            />
          </div>
          <CardTitle className="text-lg md:text-xl text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center text-[10px] md:text-base">
            Enter username and password below to login
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginClient;
