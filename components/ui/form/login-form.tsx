"use client";
import React, { useActionState } from "react";
import { InputWithLabel } from "../input-label";
import { login } from "@/app/api/action";
import SubmitButton from "../button/submit-button";
import { toast, useToast } from "../use-toast";
import { z } from "zod";

export default function LoginForm() {
  const { toast } = useToast();
  async function userLogin(formData: FormData) {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await login(data);
    if (response?.error) {
      toast({
        title: "Login Error!",
        description: response.error,
        variant: "destructive",
        duration: 1500,
      });
    } else {
      toast({
        title: "Login Successful",
        variant: "success",
        duration: 1500,
      });
    }
  }
  return (
    <form action={userLogin} className="w-full flex flex-col gap-4">
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
