"use client";
import { Link } from "react-transition-progress/next";
import Image from "next/image";
import React, { startTransition, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ICON_COLOR, ICON_SIZE } from "./sidebar/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { FaNoteSticky } from "react-icons/fa6";
import QuickSnip from "@/public/image/icons/quick-snip.svg";
import { usePathname, useRouter } from "next/navigation";
import { useQuickSnipStore } from "@/stores/quick-snip-modal";
import { useToast } from "./use-toast";
import { createNote } from "@/data/client/note";
import { User } from "@supabase/supabase-js";
import { shouldShowFloatingButton } from "@/utils/route";
import { useProgress } from "react-transition-progress";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { isUserAuthenticated } from "@/app/api/action";
type Props = {
  className?: string;
  user?: User | null;
  isAuthenticatedAsAnon: boolean;
};
export default function FloatingButton({
  className,
  isAuthenticatedAsAnon,
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const { setShowModal } = useQuickSnipStore();
  const router = useRouter();
  const pathname = usePathname();
  const isKeyboardOpen = useDetectKeyboardOpen();
  const startProgress = useProgress();
  const showFloatingButton = pathname
    ? shouldShowFloatingButton(pathname)
    : false;

  const { toast } = useToast();
  const handleCreateNote = async () => {
    startTransition(async () => {
      startProgress();
      try {
        const { data, error } = await createNote();
        if (data) {
          router.push(`/create/${data.id}`);
        }
        if (error) {
          toast({
            title: "Error Creating Note",
            description: error.message,
            variant: "destructive",
          });
        }
      } catch (error: unknown) {
        toast({
          title: "Error Creating Note",
          description: error instanceof Error ? error.message : String(error),
          variant: "destructive",
        });
      }
    });
  };
  if (!showFloatingButton || isKeyboardOpen || !isAuthenticatedAsAnon) {
    return null;
  }
  return (
    <div className="fixed bottom-[68px] sm:bottom-4 right-5 xl:right-64 z-50 flex flex-col items-end">
      <div
        className={cn(
          "flex gap-2 flex-col mb-4 overflow-hidden transition-all duration-300 ease-in-out",
          isActive ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2 transition-all duration-300 ease-in-out",
            isActive ? "translate-y-0" : "translate-y-full"
          )}
        >
          <Button
            className="rounded-full p-1 size-10 hover:bg-blue-800 bg-main transition-transform"
            onClick={handleCreateNote}
          >
            <FaNoteSticky color={ICON_COLOR} size={ICON_SIZE} />
          </Button>
          <Button
            className="rounded-full size-10 p-2 hover:bg-blue-800 bg-main transition-transform"
            onClick={() => {
              setShowModal(true);
              setIsActive(false);
            }}
          >
            <Image src={QuickSnip} alt="quick-snip" width={22} height={22} />
          </Button>
        </div>
      </div>
      <Button
        className={cn(
          `size-10 cursor-pointer p-1 rounded-full bg-main hover:bg-blue-800 z-50 transition-all duration-300 flex `,
          isActive ? "rotate-45 bg-red-500 hover:bg-red-600" : "rotate-0",
          className
        )}
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <FaPlus color={ICON_COLOR} size={ICON_SIZE} />
      </Button>
    </div>
  );
}
