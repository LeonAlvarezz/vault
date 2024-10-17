"use client";
import React, { useState } from "react";
import SubmitButton from "@/components/ui/button/submit-button";
import { Input } from "@/components/ui/input";
import { registerUsername } from "@/app/api/action";
import { toast } from "../use-toast";
import { AuthError } from "@supabase/supabase-js";
import { ZodFormattedError } from "zod";
import { RegisterUsername } from "@/types/profiles.type";
import { InputWithLabel } from "../input-label";

export default function RegisterUsernameForm() {
  const [errors, setErrors] =
    useState<ZodFormattedError<RegisterUsername> | null>(null);
  async function register(formData: FormData) {
    const data = {
      username: formData.get("username"),
    };
    const response = await registerUsername(data);
    if (response?.error) {
      if (response.error instanceof String) {
        toast({
          title: "Register Error!",
          description: response.error,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        setErrors(response.error as ZodFormattedError<RegisterUsername>);
      }
    } else {
      toast({
        title: "Register Successful",
        variant: "success",
        duration: 1500,
      });
    }
  }
  return (
    <form action={register} className="flex flex-col gap-2 sm:w-[80%] w-full">
      <div className="flex gap-4 flex-col">
        <h1 className="font-bold text-2xl capitalize">Almost there!</h1>
        <InputWithLabel
          name="username"
          placeholder="Enter username..."
          label="What would you like to be called?"
          errors={errors}
        />
      </div>
      <SubmitButton label="Continue" />
    </form>
  );
}
