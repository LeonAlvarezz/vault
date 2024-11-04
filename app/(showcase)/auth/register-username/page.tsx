import RegisterUsernameForm from "@/components/ui/form/register-username-form";
import React from "react";

export default function page() {
  return (
    <section className="section-center flex items-center !min-h-[calc(100vh-56px)] justify-center">
      <RegisterUsernameForm />
    </section>
  );
}
