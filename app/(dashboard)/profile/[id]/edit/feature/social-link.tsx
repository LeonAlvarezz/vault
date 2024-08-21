import { IconInputWithLabel } from "@/components/ui/input-label";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineWebAsset } from "react-icons/md";

export default function SocialLinkSection() {
  return (
    <section className="flex gap-10 flex-col sm:flex-row justify-between items-center">
      <div className="basis-2/5">
        <h2>Contact Link</h2>
        <p className="text-xs mt-2 text-neutral-500">
          Enable other user who visited the profile to contact you through the
          social media link
        </p>
      </div>
      <div className="basis-1/2 w-full flex gap-10 flex-col">
        <IconInputWithLabel
          label={"Github"}
          placeholder="Github"
          icon={<FaGithub size={20} />}
        />
        <IconInputWithLabel
          label={"Linkedin"}
          placeholder="Linkedin"
          icon={<FaLinkedin size={20} color="#0E76A8" />}
        />
        <IconInputWithLabel
          label={"Personal Website"}
          placeholder="Personal Website"
          icon={<MdOutlineWebAsset size={20} color="#971181" />}
        />
      </div>
    </section>
  );
}
