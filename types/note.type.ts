export enum NOTE_CONTENT_TYPE {
  PARAGRAPH = "paragraph",
  TEXT = "text",
  CODE = "code",
  CODE_BLOCK = "code_block",
  HEADING_1 = "heading_1",
  IMAGE = "image",
}

export type BlockNode = CodeBlockNode | ParagraphNode | CodeNode | ImageNode;
type CodeBlockNode = {
  type: NOTE_CONTENT_TYPE.CODE_BLOCK;
  attrs: {
    language: string | null;
  };
  content: TextNode[];
};

type CodeNode = {
  type: NOTE_CONTENT_TYPE.CODE;
  attrs: {
    language: string | null;
  };
  content: TextNode[];
};

type ParagraphNode = {
  type: NOTE_CONTENT_TYPE.PARAGRAPH;
  content: TextNode[];
};

type ImageNode = {
  type: NOTE_CONTENT_TYPE.IMAGE;
  content: TextNode[];
};

//   type BulletListNode = {
//     type: 'bulletList';
//     content: ListItemNode[];
//   };

//   type ListItemNode = {
//     type: 'listItem';
//     content: ParagraphNode[];
//   };

type TextNode = {
  type: NOTE_CONTENT_TYPE.TEXT;
  text: string;
};

type NoteContent = {
  type: NOTE_CONTENT_TYPE;
  content: BlockNode[];
};