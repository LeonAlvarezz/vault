"use client";
import React from "react";
import { InputWithLabel } from "@/components/ui/input-label";
import { signup } from "@/app/api/action";
import SubmitButton from "../button/submit-button";
import { useToast } from "../use-toast";
type Props = {
  returnUrl?: string | string[] | undefined;
};
export default function SignupForm({ returnUrl }: Props) {
  const { toast } = useToast();
  async function userSignup(formData: FormData) {
    const data = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    };
    const response = await signup(data, returnUrl);
    if (response?.error) {
      toast({
        title: "Signup Error!",
        description: response.error,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Signup Successful",
        variant: "success",
        duration: 1500,
      });
    }
  }
  return (
    <form action={userSignup} className="w-full flex flex-col gap-4">
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
