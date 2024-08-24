import { BlockNode, Note, NOTE_CONTENT_TYPE } from "@/types/note.type";
import { renderNote } from "@/lib/renderNote";
import mockData from "@/mock-data/note.json";
type Props = {
  data?: any[] | null;
  // id: string;
  note: Note;
};
export default async function Render({ data, note }: Props) {
  // const notes = mockData.note.filter((data) => data.id == +id);
  return (
    <div className="tiptap dark:text-white text-slate-800 flex flex-col gap-2">
      {note.content.content.map((block, blockIndex) => (
        <div key={blockIndex}>{renderNote(block as BlockNode)}</div>
      ))}
    </div>
  );
}
