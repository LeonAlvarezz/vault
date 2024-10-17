import React from "react";
import { Button } from "../button";
import ImageContainerBlur from "../image-container-blur";
import { signInWithGoogle } from "@/app/api/action";

export default function GoogleButton() {
  return (
    <form action={signInWithGoogle} className="w-full">
      <Button variant={"outline"} className="flex py-6 gap-4 w-full">
        <ImageContainerBlur src="/image/google.png" className="size-6" />
        <p>Continue with Google</p>
      </Button>
    </form>
  );
}
