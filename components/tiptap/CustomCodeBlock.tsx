import React, { ChangeEventHandler, useState } from "react";
import {
  NodeViewWrapper,
  NodeViewContent,
  NodeViewProps,
  Node,
  mergeAttributes,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CopyButton from "../ui/button/copy-button";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import './CodeBlockComponent.scss'

const LANGUAGE = [
  {
    label: "Javascript",
    value: "js",
  },
  {
    label: "Typescript",
    value: "ts",
  },
  {
    label: "Java",
    value: "java",
  },
  {
    label: "Go",
    value: "go",
  },
  {
    label: "HTML",
    value: "html",
  },
];

const CustomCodeBlock = (props: NodeViewProps) => {
  const { updateAttributes, extension } = props;
  const [selectedLanguage, setSelectedLanguage] = useState("js");
  const [title, setTitle] = useState("index");

  //   const availableLanguages = listLanguages();

  const onChange = (value: string) => {
    setSelectedLanguage(value);
    updateAttributes({ language: value });
  };

  return (
    <NodeViewWrapper className="code-block">
      <div>
        <div className="w-full bg-neutral-800 flex justify-between px-2 rounded-tr-sm rounded-tl-sm">
          <div className="flex gap-2">
            <Select
              defaultValue="js"
              value={selectedLanguage}
              onValueChange={onChange}
            >
              <SelectTrigger className="w-fit px-2 h-6 border-0 bg-transparent hover:bg-neutral-700/50 text-[10px] text-neutral-400">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE.map((lang, index) => (
                  <SelectItem key={index} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="h-6 w-[100px] bg-transparent hover:bg-neutral-700/50 text-neutral-400 text-[10px]"
              value={title}
              onChangeCapture={(e) => {
                setTitle(e.currentTarget.value);
                updateAttributes({ title: e.currentTarget.value });
              }}
            />
          </div>
          <CopyButton
            text={"copy"}
            className="h-6 rounded-md p-1 w-fit bg-transparent hover:bg-neutral-700/50 text-neutral-400"
          />
        </div>
        <pre className={`language-${selectedLanguage}`}>
          <NodeViewContent as="code" />
        </pre>
      </div>
    </NodeViewWrapper>
  );
};

// export const CodeBlockExtension = Node.create({
//   name: "codeBlock",

//   group: "block",

//   content: "text*",

//   marks: "",

//   code: true,

//   defining: true,

//   addAttributes() {
//     return {
//       language: {
//         default: "js",
//         parseHTML: (element) => element.getAttribute("data-language"),
//         renderHTML: (attributes) => {
//           if (!attributes.language) {
//             return {};
//           }
//           return {
//             "data-language": attributes.language,
//           };
//         },
//       },
//       title: {
//         default: "index",
//         parseHTML: (element) => element.getAttribute("data-title"),
//         renderHTML: (attributes) => {
//           if (!attributes.title) {
//             return {};
//           }
//           return {
//             "data-title": attributes.title,
//           };
//         },
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: "pre",
//       },
//     ];
//   },

//   // renderHTML({ HTMLAttributes }) {
//   //   return ["pre", mergeAttributes(HTMLAttributes), ["code", 0]];
//   // },

//   addNodeView() {
//     return ReactNodeViewRenderer(CustomCodeBlock);
//   },
// });

export const CodeBlockExtension = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      language: {
        default: "js",
        parseHTML: (element) => element.getAttribute("data-language"),
        renderHTML: (attributes) => {
          if (!attributes.language) {
            return {};
          }
          return {
            "data-language": attributes.language,
          };
        },
      },
      title: {
        default: "index",
        parseHTML: (element) => element.getAttribute("data-title"),
        renderHTML: (attributes) => {
          if (!attributes.title) {
            return {};
          }
          return {
            "data-title": attributes.title,
          };
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(CustomCodeBlock);
  },
});
