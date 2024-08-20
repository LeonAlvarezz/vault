import React from "react";
import { InputWithLabel } from "@/components/ui/input-label";
import { signup } from "@/app/api/action";
import SubmitButton from "../button/submit-button";
export default function SignupForm() {
  return (
    <form action={signup} className="w-full flex flex-col gap-4">
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
      <SubmitButton label="Continue" />
    </form>
  );
}
