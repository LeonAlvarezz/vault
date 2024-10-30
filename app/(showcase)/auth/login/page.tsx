import { Button } from "@/components/ui/button";
import GithubButton from "@/components/ui/button/github-button";
import GoogleButton from "@/components/ui/button/google-button";
import LoginForm from "@/components/ui/form/login-form";
import { InputWithLabel } from "@/components/ui/input-label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-transition-progress/next";
import React from "react";
type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <div className="section-center !min-h-[calc(100vh-56px)]">
      <div className="w-full mx-auto lg:w-[70%] xl:w-[50%] flex flex-col justify-center !min-h-[calc(100vh-56px)] items-center">
        <div className="text-center leading-loose">
          <h1 className="text-balance text-2xl font-bold">
            Welcome Back to Vault
          </h1>
          <p className="text-sm mt-2 text-neutral-400">
            New to Vault?{" "}
            <Link
              href={
                params?.returnUrl
                  ? `/auth/signup?returnUrl=${params.returnUrl}`
                  : `/auth/signup`
              }
              className="text-second underline hover:text-second/80 font-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-6 w-full ">
          <GoogleButton />
          {/* <GithubButton /> */}
        </div>
        <Separator className="my-6" />
        <LoginForm returnUrl={params?.returnUrl} />
        <Link
          className="mt-6 text-sm hover:text-second"
          href={"/forgot-password"}
        >
          Forget Password?
        </Link>
      </div>
    </div>
  );
}
