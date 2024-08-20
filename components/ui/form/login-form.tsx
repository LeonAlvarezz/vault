import React, { useActionState } from "react";
import { InputWithLabel } from "../input-label";
import { login } from "@/app/api/action";
import SubmitButton from "../button/submit-button";

export default async function LoginForm() {
  return (
    <form action={login} className="w-full flex flex-col gap-4">
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
      <SubmitButton label="Login" />
    </form>
  );
}
