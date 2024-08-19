import React from "react";
import { Button } from "../button";
import ImageContainer from "../image-container";

export default function GoogleButton() {
  return (
    <Button variant={"outline"} className="flex py-6 gap-4">
      <ImageContainer src="/image/google.png" className="size-6" />
      <p>Continue with Google</p>
    </Button>
  );
}
