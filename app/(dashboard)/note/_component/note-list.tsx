import NoteCard from "@/components/ui/note-card/note-card";
import NoteCardPublished from "@/components/ui/note-card/note-card-published";
import { Note } from "@/types/note.type";
type Props = {
  notes: Note[];
  optionButton?: boolean;
};
export default function NoteList({ notes, optionButton = false }: Props) {
  return (
    <section className="columns-1 sm:columns-2 2xl:columns-3 gap-2 space-y-2 my-6 align-super">
      {notes?.map((note) =>
        note.published_at ? (
          <NoteCardPublished
            key={note.id}
            note={note}
            optionButton={optionButton}
          />
        ) : (
          <NoteCard key={note.id} note={note} />
        )
      )}
    </section>
  );
}
