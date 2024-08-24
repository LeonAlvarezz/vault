import { BlockNode, Note, NOTE_CONTENT_TYPE } from "@/types/note.type";
import { renderNote } from "@/lib/renderNote";
type Props = {
  data?: any[] | null;
  // id: string;
  note: Note;
};
export default async function Render({ data, note }: Props) {
  return (
    <div className="tiptap dark:text-white text-slate-800 flex flex-col gap-2">
      {note.content.content.map((block, blockIndex) => (
        <div key={blockIndex}>{renderNote(block as BlockNode)}</div>
      ))}
    </div>
  );
}
