import { getNoteById } from "@/data/server/note";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import {
  NodeHandler,
  NodeHandlers,
  TipTapRender,
} from "@troop.com/tiptap-react-render";
import { useMemo } from "react";
import { common, createLowlight } from "lowlight";
type Props = {
  data: any[] | null;
};
export default async function Render(props: Props) {
  const output = useMemo(() => {
    return generateHTML(props.data![0].content, [
      Document,
      Paragraph,
      Text,
      Bold,
      Blockquote,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        languageClassPrefix: "language-css",
      }),
      BulletList,
      ListItem,
      OrderedList,
    ]);
  }, [props.data]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: output }}
      className="tiptap dark:text-white text-slate-800 w-[80%] m-auto"
    ></div>
  );
}
