import { getNoteById } from "@/data/server/note";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Strikethrough from "@tiptap/extension-strike";
import { Heading } from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useMemo } from "react";
import { common, createLowlight } from "lowlight";
import { mergeAttributes } from "@tiptap/react";
type Props = {
  data: any[] | null;
};
export default async function Render(props: Props) {
  const output = useMemo(() => {
    return generateHTML(props.data![0].content, [
      Document,
      Paragraph,
      Text,
      Code,
      Bold,
      Blockquote,
      Strikethrough,
      Italic,
      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [key: number]: string } = {
            1: "text-4xl",
            2: "text-2xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
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
