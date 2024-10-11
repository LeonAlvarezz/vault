import { Button } from "@/components/ui/button";
import GithubButton from "@/components/ui/button/github-button";
import GoogleButton from "@/components/ui/button/google-button";
import SignupForm from "@/components/ui/form/signup-form";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-transition-progress/next";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full mx-auto lg:w-[70%] xl:w-[50%] flex flex-col min-h-svh sm:min-h-screen justify-center items-center">
      <div className="text-center leading-loose">
        <h1 className="text-balance text-2xl font-bold">Welcome Aboard</h1>
      </div>
      <div className="flex flex-col gap-2 mt-6 w-full ">
        <GoogleButton />
        <GithubButton />
      </div>
      <Separator className="my-6" />
      <SignupForm />
      <p className="text-sm mt-6 text-neutral-400">
        Already have an account?{" "}
        <Link
          href={"/auth/login"}
          className="text-second underline hover:text-second/80 font-bold"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
