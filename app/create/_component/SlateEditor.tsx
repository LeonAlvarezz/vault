"use client";
import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Slate, Editable, withReact } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";

// Define proper types for your initial state
// const initialValue: Descendant[] = [
//   {
//     type: "paragraph",
//     children: [{ text: "" }],
//   },
// ];

export default function SlateEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
  };

  const LIST_TYPES = ["numbered-list", "bulleted-list"];
  const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

  const toggleBlock = (editor: Editor, format: string) => {
    const isActive = isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });

    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = { align: isActive ? undefined : format };
    } else {
      newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
      };
    }
    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const toggleMark = (editor: Editor, format: string) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  //   const isBlockActive = (
  //     editor: Editor,
  //     format: string,
  //     blockType: string = "type"
  //   ) => {
  //     const { selection } = editor;
  //     if (!selection) return false;

  //     const [match] = Array.from(
  //       Editor.nodes(editor, {
  //         at: Editor.unhangRange(editor, selection),
  //         match: (n) =>
  //           !Editor.isEditor(n) &&
  //           SlateElement.isElement(n) &&
  //           n[blockType] === format,
  //       })
  //     );

  //     return !!match;
  //   };

  const handleChange = useCallback((newValue: any) => {
    setValue(newValue);
  }, []);

  return (
    <Slate editor={editor} initialValue={value} onChange={handleChange}>
      <Editable
        className="dark:text-white focus:outline-none text-slate-900"
        placeholder="Content Goes Here"
        spellCheck
        autoFocus
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
}
