import ImageContainer from "@/components/ui/image-container";
import {
  BlockNode,
  NOTE_CONTENT_TYPE,
  TEXT_MARK_TYPE,
  TextNode,
} from "@/types/note.type";
import hljs from "highlight.js";
import Image from "next/image";
import React from "react";
import CodeBlock from "@/components/tiptap/CodeBlock";

export function renderNote(node: BlockNode): JSX.Element {
  switch (node.type) {
    case NOTE_CONTENT_TYPE.IMAGE:
      return (
        <div className="mb-4 bg-red-500">
          <ImageContainer src={node.attrs.src} alt={node.attrs.alt} />
        </div>
      );
    case NOTE_CONTENT_TYPE.PARAGRAPH:
      return <p className="text-">{renderContent(node.content)}</p>;

    case NOTE_CONTENT_TYPE.TEXT:
      return renderText(node);

    case NOTE_CONTENT_TYPE.CODE_BLOCK:
      const language = node.attrs?.language || "ts";
      const highlightedCode = hljs.highlight(node.content[0].text, {
        language: language,
      }).value;
      return (
        <pre className={`language-${language}`}>
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      );

    case NOTE_CONTENT_TYPE.BULLET_LIST:
      return (
        <ul>
          {node.content.map((listItemNode, index) => (
            <li key={index}>{renderNote(listItemNode)}</li>
          ))}
        </ul>
      );

    case NOTE_CONTENT_TYPE.ORDERED_LIST:
      return (
        <ol>
          {node.content.map((listItemNode, index) => (
            <li key={index}>{renderNote(listItemNode)}</li>
          ))}
        </ol>
      );

    case NOTE_CONTENT_TYPE.LIST_ITEM:
      return (
        <>
          {node.content.map((contentNode, index) => (
            <React.Fragment key={index}>
              {renderNote(contentNode)}
            </React.Fragment>
          ))}
        </>
      );

    case NOTE_CONTENT_TYPE.BLOCKQUOTE:
      return (
        <>
          <blockquote>
            {node.content.map((contentNode, index) => (
              <React.Fragment key={index}>
                {renderNote(contentNode)}
              </React.Fragment>
            ))}
          </blockquote>
        </>
      );
    case NOTE_CONTENT_TYPE.HEADING:
      const HeadingTag = `h${node.attrs?.level}` as keyof JSX.IntrinsicElements;
      return <HeadingTag>{renderContent(node.content)}</HeadingTag>;

    default:
      return <>{node}</>;
  }
}

const renderText = (node: TextNode): React.ReactElement => {
  if (!node.text) {
    return <></>;
  }

  if (!node.marks || node.marks.length === 0) {
    return <>{node.text}</>;
  }

  return node.marks.reduce((acc, mark) => {
    switch (mark.type) {
      case TEXT_MARK_TYPE.BOLD:
        return <strong>{acc}</strong>;
      case TEXT_MARK_TYPE.ITALIC:
        return <em>{acc}</em>;
      case TEXT_MARK_TYPE.CODE:
        return <code>{acc}</code>;
      case TEXT_MARK_TYPE.LINK:
        return (
          <a href={mark.attrs?.href} target={mark.attrs?.target}>
            {acc}
          </a>
        );
      default:
        return <>{acc}</>;
    }
  }, <>{node.text}</>);
};

const renderContent = (content?: BlockNode[]): React.ReactNode => {
  if (!content) return null;
  return content.map((node, index) => (
    <React.Fragment key={index}>{renderNote(node)}</React.Fragment>
  ));
};

export function renderNoteDescription(node: BlockNode) {
  switch (node.type) {
    case NOTE_CONTENT_TYPE.PARAGRAPH:
    case NOTE_CONTENT_TYPE.CODE_BLOCK: {
      return (
        <>
          {node.content.map((textNode, index) => (
            <p
              key={index}
              className="w-full line-clamp-4 mt-2 text-xs text-neutral-500"
            >
              {textNode.text}
            </p>
          ))}
        </>
      );
    }
    case NOTE_CONTENT_TYPE.IMAGE:
      return (
        <p className="w-full line-clamp-4 mt-2 text-xs text-neutral-500">
          Image
        </p>
      );
  }
}
