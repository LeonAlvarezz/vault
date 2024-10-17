"use client";
import React, { useState } from "react";
import { Button } from "../button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineWebAsset } from "react-icons/md";
import { Link } from "react-transition-progress/next";
import { Profile } from "@/types/profiles.type";
type LayoutOptions = "default" | "alternative" | "mobile";
const layoutClasses: Record<
  LayoutOptions,
  { github: string; linkedin: string; website: string }
> = {
  default: {
    github: "translate(50%, 120%)",
    linkedin: "translate(220%, -50%)",
    website: "translate(175%, 90%)",
  },
  alternative: {
    github: "translate(50%, -220%)",
    linkedin: "translate(220%, -50%)",
    website: "translate(170%, -190%)",
  },
  mobile: {
    github: "translate(-160%, -220%)",
    linkedin: "translate(-320%, -50%)",
    website: "translate(-275%, -190%)",
  },
};

type Props = {
  layout?: LayoutOptions;
  profile: Profile | null;
};

export default function ContactButton({ layout = "default", profile }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  if (!profile?.websiteLink && !profile?.linkedinLink && !profile?.githubLink) {
    return null;
  }

  return (
    <div className="relative contact-button-main h-fit">
      <Button
        variant={"main"}
        size={"sm"}
        onClick={toggleOpen}
        className="hover:bg-blue-800 relative z-20"
      >
        Contact
      </Button>
      {profile?.githubLink && (
        <Link
          href={profile.githubLink}
          className={`p-0 contact-button rounded-sm hover:text-second ${
            isOpen ? "visible" : ""
          }`}
          style={{
            transform: isOpen ? layoutClasses[layout].github : "",
          }}
        >
          <FaGithub size={20} />
        </Link>
      )}
      {profile?.linkedinLink && (
        <Link
          href={profile.linkedinLink}
          className={`p-0 contact-button rounded-sm hover:text-second ${
            isOpen ? "visible" : ""
          }`}
          style={{
            transform: isOpen ? layoutClasses[layout].linkedin : "",
          }}
        >
          <FaLinkedin size={20} />
        </Link>
      )}
      {profile?.websiteLink && (
        <Link
          href={profile.websiteLink}
          className={`p-0 contact-button rounded-sm hover:text-second ${
            isOpen ? "visible" : ""
          }`}
          style={{
            transform: isOpen ? layoutClasses[layout].website : "",
          }}
        >
          <MdOutlineWebAsset size={24} />
        </Link>
      )}
    </div>
  );
}
