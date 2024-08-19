import React from "react";
import { InputWithLabel } from "../input-label";
import { Button } from "../button";
import { login } from "@/app/api/action";

export default function LoginForm() {
  return (
    <form className="w-full flex flex-col gap-4">
      <InputWithLabel
        type="email"
        name="email"
        placeholder="Enter your email..."
        label="Email"
      />
      <InputWithLabel
        name="password"
        type="password"
        placeholder="Enter your password..."
        label="Password"
      />

      <Button formAction={login} variant={"main"} className="mt-6 w-full">
        Login
      </Button>
    </form>
  );
}
