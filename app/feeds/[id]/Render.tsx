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
import ImageContainer from "@/components/ui/image-container";
import { BlockNode, NOTE_CONTENT_TYPE } from "@/types/note.type";
import { renderNote } from "@/lib/renderNote";
import { render } from "react-dom";
type Props = {
  data?: any[] | null;
};
export default async function Render(props: Props) {
  const content: BlockNode[] = [
    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Google elementum egestas orci dignissim praesent. Lacinia dui nisl vivamus at justo lacus. Id urna eleifend amet laoreet bibendum. Nostra pulvinar scelerisque mauris integer est. Volutpat auctor dolor quis fermentum leo venenatis nulla habitant pellentesque. Mus erat lacus porta velit ut amet. Ex pharetra elementum penatibus mus, et interdum nam. Sagittis commodo egestas dignissim semper vivamus ligula id taciti. Diam litora ridiculus ultricies dapibus proin sed suscipit pharetra",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "Placerat efficitur dui nullam nam pellentesque ipsum tortor; sapien porta. Interdum interdum nunc molestie egestas taciti felis diam gravida blandit. Scelerisque velit consectetur in nulla lorem eleifend tellus. Primis venenatis sit egestas justo, dictumst phasellus purus volutpat faucibus. Tortor luctus amet erat at litora; dictum sagittis. Rutrum convallis mollis himenaeos pulvinar, justo porttitor nisi feugiat est. Congue elit erat a sociosqu, pharetra magnis quam elementum. Blandit aenean ultricies luctus elementum iaculis aptent. Natoque egestas iaculis urna iaculis rutrum dolor?",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.IMAGE,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx-2048x1024.jpg",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.CODE,
      attrs: {
        language: "javascript",
      },
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "npm install react@latest",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Google elementum egestas orci dignissim praesent. Lacinia dui nisl vivamus at justo lacus. Id urna eleifend amet laoreet bibendum. Nostra pulvinar scelerisque mauris integer est. Volutpat auctor dolor quis fermentum leo venenatis nulla habitant pellentesque. Mus erat lacus porta velit ut amet. Ex pharetra elementum penatibus mus, et interdum nam. Sagittis commodo egestas dignissim semper vivamus ligula id taciti. Diam litora ridiculus ultricies dapibus proin sed suscipit pharetra",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.CODE_BLOCK,
      attrs: {
        language: "javascript",
      },
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: `<!DOCTYPE html>
          <html>
            <head>
              <title>Change Text Example</title>
            </head>
            <body>
              <p id="demo">This is a demonstration.</p>
              <button onclick="changeText()">Click Me!</button>
              <script>
                function changeText() {
                  document.getElementById("demo").innerHTML = "Text has changed!";
                }
              </script>
            </body>
          </html>`,
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "Placerat efficitur dui nullam nam pellentesque ipsum tortor; sapien porta. Interdum interdum nunc molestie egestas taciti felis diam gravida blandit. Scelerisque velit consectetur in nulla lorem eleifend tellus. Primis venenatis sit egestas justo, dictumst phasellus purus volutpat faucibus. Tortor luctus amet erat at litora; dictum sagittis. Rutrum convallis mollis himenaeos pulvinar, justo porttitor nisi feugiat est. Congue elit erat a sociosqu, pharetra magnis quam elementum. Blandit aenean ultricies luctus elementum iaculis aptent. Natoque egestas iaculis urna iaculis rutrum dolor?",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.IMAGE,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "https://images.unsplash.com/photo-1720048169970-9c651cf17ccd?q=80&w=2814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },
  ];

  return (
    <div className="tiptap dark:text-white text-slate-800 flex flex-col gap-2 py-10">
      {content.map((content, index) => (
        <div key={index}>{renderNote(content)}</div>
      ))}
    </div>
  );
}
