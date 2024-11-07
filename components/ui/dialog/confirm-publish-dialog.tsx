"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { Input } from "../input";
import { IoCopy } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { publishNote, unpublishNote } from "@/data/client/note";
import { useToast } from "../use-toast";
import { Note } from "@/types/note.type";
import CopyButton from "../button/copy-button";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {
  note?: Note | null;
  category: string;
  children: React.ReactNode;
};
export default function ConfirmPublishDialog({
  note,
  category,
  children,
}: Props) {
  const [notePath, setNotePath] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setNotePath(window.location.href.replace("create", "note"));
  }, []);
  const handlePublishNote = async () => {
    setLoading(true);
    if (!note) {
      toast({
        title: "Error Publishing Note!",
        description: "No Note ID provided",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!category) {
      toast({
        title: "Error Publishing Note!",
        description: "Note cannot be published without Category",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    try {
      const { error } = await publishNote(note.id);
      if (error) {
        toast({
          title: "Error Publishing Note!",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Your note is now live!",
        variant: "success",
      });
    } catch (error: unknown) {
      toast({
        title: "Unexpected Error!",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      // refresh();
      setLoading(false);
    }
  };
  const handleUnpublishNote = async () => {
    if (!note) {
      toast({
        title: "Error Unpublishing Note!",
        description: "No Note ID provided",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const { error } = await unpublishNote(note.id);
      if (error) {
        toast({
          title: "Error Unpublishing Note!",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Your note is now private!",
        variant: "success",
      });
    } catch (error: unknown) {
      toast({
        title: "Unexpected Error!",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      // refresh();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Publish Note</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-neutral-200">
          Upon confirm publish, your note will be visible to everyone and you
          will be able to share your note through the link
        </p>
        <div className="flex">
          <Input
            variant={"outline"}
            disabled={note?.published_at === null}
            className="w-full rounded-r-none"
            defaultValue={notePath}
          />
          <CopyButton text={notePath} disabled={note?.published_at === null} />
        </div>
        <DialogFooter className="mt-4">
          {/* <Button
            variant={"outline"}
            type="button"
            // onClick={() => setOpen(false)}
          >
            Cancel
          </Button> */}
          {!note?.published_at ? (
            <Button variant={"main"} type="button" onClick={handlePublishNote}>
              {loading && (
                <AiOutlineLoading3Quarters
                  size={14}
                  className="animate-spin mr-2"
                />
              )}
              Publish
            </Button>
          ) : (
            <Button
              variant={"outline"}
              type="button"
              onClick={handleUnpublishNote}
              className="border-main hover:border-main/40"
            >
              {loading && (
                <AiOutlineLoading3Quarters
                  size={14}
                  className="animate-spin mr-2"
                />
              )}
              Unpublish
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
