"use client";
import React, { useState } from "react";
import { Button } from "../button";
import { Link } from "react-transition-progress/next";
import { IoMdClose } from "react-icons/io";
type Props = {
  isAuthenticatedAsAnon: boolean;
};
export default function LoginSignUpFloatingButton({
  isAuthenticatedAsAnon,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);
  if (isAuthenticatedAsAnon) {
    return null;
  }
  return (
    <>
      {isOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md sm:left-auto sm:right-4 sm:translate-x-0 bg-popover border p-4 rounded-sm flex flex-col gap-4 z-50">
          <div className="w-full absolute top-2 right-2 flex justify-end items-end h-fit ">
            <Button
              onClick={() => setIsOpen(false)}
              variant={"icon"}
              className="p-0 hover:text-neutral-100/50 h-fit"
            >
              <IoMdClose size={16} />
            </Button>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-lg">
              Join us for free and unlock more features!
            </p>
            <p className="text-sm text-neutral-500 mt-2">
              Access all features and save your work—no cost, no hassle.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href={"/auth/login"}
              className="bg-main text-md h-10 w-full flex justify-center items-center px-6 rounded-sm hover:bg-main/80"
            >
              Login
            </Link>
            <Link
              href={"/auth/signup"}
              className="border bg-transparent text-md h-10 flex justify-center items-center w-full px-6 rounded-sm hover:border-neutral-700/50"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
