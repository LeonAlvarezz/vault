import React from "react";
import { Button } from "../button";
import ImageContainer from "../image-container";
import { FaGithub } from "react-icons/fa";

export default function GithubButton() {
  return (
    <Button variant={"outline"} className="flex py-6 gap-4">
      <FaGithub size={24} />
      <p>Continue with Github</p>
    </Button>
  );
}
