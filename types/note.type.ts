import { Json } from "@/database.types";
import { JSONContent } from "@tiptap/react";
import { Category } from "./category.type";
import { Profile } from "./profiles.type";
import { Like } from "./like.type";
import { Bookmark } from "./bookmark.type";
import { NoteTag, Tag } from "./tag.type";

export enum NOTE_CONTENT_TYPE {
  PARAGRAPH = "paragraph",
  TEXT = "text",
  CODE_BLOCK = "codeBlock",
  HEADING = "heading",
  IMAGE = "image",
  BULLET_LIST = "bulletList",
  ORDERED_LIST = "orderedList",
  BLOCKQUOTE = "blockquote",
  HARD_BREAK = "hardBreak",
  LIST_ITEM = "listItem",
}

export enum TEXT_MARK_TYPE {
  CODE = "code",
  CODE_BLOCK = "code_block",
  BOLD = "bold",
  ITALIC = "italic",
  LINK = "link",
  TEXT = "text ",
}

export type BlockNode =
  | CodeBlockNode
  | ParagraphNode
  | ImageNode
  | HeadingNode
  | BulletListNode
  | OrderedListNode
  | ListItemNode
  | BlockQuoteNode
  | HardBreakNode
  | TextNode;

type CodeBlockNode = {
  type: NOTE_CONTENT_TYPE.CODE_BLOCK;
  attrs: {
    language?: string;
    title?: string;
  };
  content: TextNode[];
};

type HeadingNode = {
  type: NOTE_CONTENT_TYPE.HEADING;
  attrs: { level: number };
  content: TextNode[];
};

type HardBreakNode = {
  type: NOTE_CONTENT_TYPE.HARD_BREAK;
};
type BulletListNode = {
  type: NOTE_CONTENT_TYPE.BULLET_LIST;
  content: ListItemNode[];
};

type OrderedListNode = {
  type: NOTE_CONTENT_TYPE.ORDERED_LIST;
  attrs: { start: number };
  content: ListItemNode[];
};

type ListItemNode = {
  type: NOTE_CONTENT_TYPE.LIST_ITEM;
  content: ParagraphNode[];
};
type BlockQuoteNode = {
  type: NOTE_CONTENT_TYPE.BLOCKQUOTE;
  content: ParagraphNode[];
};

type ParagraphNode = {
  type: NOTE_CONTENT_TYPE.PARAGRAPH;
  content: TextNode[];
};

type ImageNode = {
  type: NOTE_CONTENT_TYPE.IMAGE;
  attrs: ImageAttribute;
};

export type TextNode = {
  type: NOTE_CONTENT_TYPE.TEXT;
  text: string;
  marks?: TextMark[];
};

export type TextMark = {
  type: TEXT_MARK_TYPE;
  attrs?: LinkAttribute;
};

type LinkAttribute = {
  href: string;
  target: string;
};

type ImageAttribute = {
  alt: string;
  src: string;
  title: string | null;
};

export type Note = {
  bookmark: number | null;
  category_id: number | null;
  content: Json | null;
  content_text: string | null;
  cover_url: string | null;
  created_at: string;
  deleted_at: string | null;
  id: string;
  like: number | null;
  profile_id: string;
  published_at: string | null;
  title: string;
  updated_at: string | null;
  view: number | null;
  categories?: Category | null;
  profile?: Profile | null;
  likes?: Like[] | null;
  bookmarks?: Bookmark[] | null;
  tags?: {
    tags: NoteTag | null;
  }[];
  embedding?: string | null;
};

export type NoteFilter = {
  category?: string;
  tags: string[];
  sortBy?: "recent" | "most_popular" | "trending" | "most_liked";
  status: "published" | "unpublished" | "all";
  query?: string;
};

export type SaveNotePayload = {
  id: string;
  title: string;
  category_id: string;
  content: JSONContent;
  tags: string[];
  cover_url: string | null;
  content_text: string | null;
  // embedding: number[] | null;
};
