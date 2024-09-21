"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";

import { useQuickSnipStore } from "@/stores/quick-snip-modal";
import { Input } from "../input";
import { InputWithLabel } from "../input-label";
import TiptapEditor from "@/components/tiptap/TipTapEditor";
import { Button } from "../button";

export default function QuickSnipModal() {
  const { showModal, setShowModal } = useQuickSnipStore();
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Quick Snip</DialogTitle>
        </DialogHeader>
        <InputWithLabel label="Title" />
        <Button variant={"main"} size={"xs"} className="w-fit">
          Save
        </Button>
        {/* <TiptapEditor></TiptapEditor> */}
      </DialogContent>
    </Dialog>
  );
}
