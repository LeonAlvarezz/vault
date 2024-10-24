import EditNoteForm from "@/components/ui/form/edit-note-form";
import { getAllCategories } from "@/data/client/category";
import { getNoteContent } from "@/data/server/note";
import { getTags } from "@/data/server/tag";
import { Json } from "@/database.types";
import { JSONContent } from "@tiptap/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache, useCallback, useEffect, useRef, useState } from "react";

export type CreateNoteFormValues = {
  title: string;
  content: JSONContent | null;
  category: string;
  tags: string[];
  cover: string;
};
type Props = {
  params: Promise<{ id: string }>;
};

const getNote = cache(async (noteId: string) => {
  const { data, error } = await getNoteContent(noteId);
  return { data, error };
});

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: note } = await getNote(params.id);
  return {
    title: note ? `Vault - ${note.title}` : "Vault",
  };
}
export default async function Page(props: Props) {
  const params = await props.params;
  const [
    { data: note, error: noteError },
    { data: tags },
    { data: categories },
  ] = await Promise.all([getNote(params.id), getTags(), getAllCategories()]);

  if (noteError) {
    notFound();
  }
  return (
    <>
      <EditNoteForm tags={tags} categories={categories} note={note} />
    </>
  );
}
