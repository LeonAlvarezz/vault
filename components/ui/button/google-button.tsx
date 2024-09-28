import React from "react";
import { Button } from "../button";
import ImageContainerBlur from "../image-container-blur";

export default function GoogleButton() {
  return (
    <Button variant={"outline"} className="flex py-6 gap-4">
      <ImageContainerBlur src="/image/google.png" className="size-6" />
      <p>Continue with Google</p>
    </Button>
  );
}
