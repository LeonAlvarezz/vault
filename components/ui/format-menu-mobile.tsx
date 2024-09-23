import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RiCodeBlock } from "react-icons/ri";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaList,
  FaListOl,
  FaUpload,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

import { TbBlockquote } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { Button } from "./button";
import {
  Editor,
  mergeAttributes,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LinkModal from "./modal/link-modal";
import UploadButton from "./button/upload-button";
import { uploadImage } from "@/data/client/image";
import { useToast } from "./use-toast";
import { blobToBase64 } from "@/lib/dropImagePlugin";
type Props = {
  editor: Editor | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type CommandKeys =
  | "toggleBold"
  | "toggleItalic"
  | "toggleCode"
  | "toggleCodeBlock"
  | "toggleHeading"
  | "toggleBlockquote"
  | "toggleBulletList"
  | "toggleOrderedList";

type FormatOption = {
  value: string;
  icon: React.ComponentType<{ size: number }>;
  command: CommandKeys;
  args?: Record<string, any>;
};

const formatOptions: FormatOption[] = [
  { value: "bold", icon: FaBold, command: "toggleBold" },
  { value: "italic", icon: FaItalic, command: "toggleItalic" },
  { value: "code", icon: FaCode, command: "toggleCode" },
  { value: "codeBlock", icon: RiCodeBlock, command: "toggleCodeBlock" },
  {
    value: "heading1",
    icon: LuHeading1,
    command: "toggleHeading",
    args: { level: 1 },
  },
  {
    value: "heading2",
    icon: LuHeading2,
    command: "toggleHeading",
    args: { level: 2 },
  },
  { value: "blockquote", icon: TbBlockquote, command: "toggleBlockquote" },
  {
    value: "bulletList",
    icon: MdFormatListBulleted,
    command: "toggleBulletList",
  },
  { value: "orderedList", icon: FaListOl, command: "toggleOrderedList" },
];
export default function FormatMenuMobile({ editor, setOpen }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>(
    {}
  );
  const { toast } = useToast();

  useEffect(() => {
    if (!image) return;

    const handleUploadImage = async () => {
      if (!image) return;

      const dataUrl = await blobToBase64(image);

      const transaction = editor!.state.tr;
      editor!
        .chain()
        .setImage({
          src: dataUrl,
          alt: image.name,
        })
        .run();

      const pos = transaction.selection.anchor;

      if (dataUrl) {
        const { error } = await uploadImage(image);

        if (error) {
          editor!
            .chain()
            .deleteRange({ from: pos, to: pos + 1 })
            .run();

          toast({
            title: "Error Upload Image",
            description: error.message,
          });
        }
      }
    };

    handleUploadImage();
  }, [image, editor, toast]);

  const updateActiveFormats = useCallback(() => {
    if (editor) {
      const newActiveFormats = formatOptions.reduce((acc, option) => {
        if (option.value.startsWith("heading")) {
          acc[option.value] = editor.isActive("heading", {
            level: option.args?.level,
          });
        } else if (option.args) {
          acc[option.value] = editor.isActive(option.value, option.args);
        } else {
          acc[option.value] = editor.isActive(option.value);
        }
        return acc;
      }, {} as Record<string, boolean>);

      setActiveFormats(newActiveFormats);
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.on("update", updateActiveFormats);
      updateActiveFormats(); // Initial update
      return () => {
        editor.off("update", updateActiveFormats);
      };
    }
  }, [editor, updateActiveFormats]);

  const handleFormatToggle = useCallback(
    (option: FormatOption) => {
      if (editor) {
        const command = option.command as CommandKeys;
        if (option.args) {
          (editor.chain().focus() as any)[command](option.args).run();
        } else {
          (editor.chain().focus() as any)[command]().run();
        }
        updateActiveFormats();
      }
    },
    [editor, updateActiveFormats]
  );

  if (!editor) {
    return (
      <div className="w-full justify-center flex">
        <AiOutlineLoading3Quarters className="animate-spin" size={14} />
      </div>
    );
  }

  return (
    <div className="bottom-1 absolute left-1/2 -translate-x-1/2 overflow-x-auto w-full sm:w-fit flex gap-4 bg-popover pt-2 pb-3 px-4 rounded-sm">
      <ToggleGroup variant="outline" type="multiple">
        {formatOptions.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={`Toggle ${option.value}`}
            onMouseDown={(e) => e.preventDefault()}
            className={cn(activeFormats[option.value] ? "is-active" : "")}
            onClick={() => handleFormatToggle(option)}
          >
            <option.icon size={16} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Button
        variant="outline"
        className="p-3 h-10 context-menu"
        onPointerDown={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <FaLink size={14} />
      </Button>
      <UploadButton
        className="hover:border-neutral-500 border transition-all border-neutral-700 flex justify-center items-center"
        setImage={setImage}
      >
        <FaUpload />
      </UploadButton>
      {/* <LinkModal editor={editor} setInputActive={setInputActive} /> */}
    </div>
  );
}
