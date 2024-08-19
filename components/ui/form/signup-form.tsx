import React from "react";
import { InputWithLabel } from "@/components/ui/input-label";
import { Button } from "../button";
import { login, signup } from "@/app/api/action";
export default function SignupForm() {
  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-4">
        <InputWithLabel
          name="username"
          placeholder="Enter your username..."
          label="Username"
        />
        <InputWithLabel
          type="email"
          name="email"
          placeholder="Enter your email..."
          label="Email"
        />
        <InputWithLabel
          placeholder="Enter your password..."
          label="Password"
          name="password"
          type="password"
        />

        <InputWithLabel
          placeholder="Enter your password again..."
          label="Confirm Password"
          type="password"
        />
        <Button formAction={signup} variant={"main"} className="mt-2 w-full">
          Signup
        </Button>
      </form>
    </div>
  );
}
