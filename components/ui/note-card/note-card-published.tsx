import React from "react";
import ImageContainer from "../image-container";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import Tag from "../tag";
type NoteCardProps = {
  handleCardClick: () => void;
};
export default function NoteCardPublished({ handleCardClick }: NoteCardProps) {
  const router = useRouter();

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    router.push("/profile/1");
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log("Button clicked!");
  };

  return (
    <div
      onClick={handleCardClick}
      className="max-w-full h-auto bg-neutral-800 p-2 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid  hover:border border-neutral-700  hover:scale-[1.02] transition-transform"
    >
      <ImageContainer
        className="h-[200px] overflow-hidden rounded-sm "
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="flex flex-col flex-grow p-1">
        <Tag color="orange" className="h-6">
          <p>React</p>
        </Tag>
        <div className="flex-grow flex flex-col gap-2 mt-1">
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-md font-semibold">What is React</h2>
              <p className="w-full line-clamp-2 mt-2 text-xs text-neutral-500">
                As we delve into 2024, the landscape of web development
                continues to evolve at a rapid pace. React, one of the most
                popular JavaScript libraries for building user interfaces, has
                maintained its position at the forefront of frontend
                development. With its component-based architecture and virtual
                DOM, React offers
              </p>
            </div>
            {/* <Button
            onClick={handleButtonClick}
            variant={"icon"}
            size={"icon"}
            className="group w-5 h-5 hover:text-blue-500 self-end z-50"
          >
            <SlOptionsVertical />
          </Button> */}
            <Button
              onClick={handleButtonClick}
              variant={"icon"}
              // size={"icon"}
              className="rounded-full p-2 size-8 relative left-2 flex-shrink-0 hover:bg-neutral-700/50 focus-visible:ring-offset-0"
            >
              <SlOptionsVertical />
            </Button>
          </div>
          <div className="flex justify-between w-full items-center mt-1">
            <div onClick={handleProfileClick} className="flex gap-2">
              <Avatar className="w-7 h-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* <div className="flex justify-between w-full"> */}
              <div className="flex flex-col">
                <p className="text-sm text-neutral-200">John Doe</p>
                <p className="text-xs text-neutral-500">16 Jul 2024</p>
              </div>
            </div>
            <div className="flex gap-2 items-end">
              <Button
                onClick={handleButtonClick}
                variant={"icon"}
                size={"icon"}
                className="group w-5 h-5 hover:text-red-500 self-end"
              >
                <FaRegHeart className="group w-full h-full" />
              </Button>
              <Button
                onClick={handleButtonClick}
                variant={"icon"}
                size={"icon"}
                className="group w-5 h-5 hover:text-blue-500 self-end"
              >
                <IoBookmarkOutline className="group w-full h-full" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
