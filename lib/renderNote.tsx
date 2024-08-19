import ImageContainer from "@/components/ui/image-container";
import { BlockNode, NOTE_CONTENT_TYPE } from "@/types/note.type";
import { common, createLowlight } from "lowlight";
import hljs from "highlight.js"; // Import highlight.js styles in your global CSS

export function renderNote(node: BlockNode) {
  switch (node.type) {
    case NOTE_CONTENT_TYPE.PARAGRAPH:
      return (
        <p className="text-sm text-neutral-300">
          {node.content.map((textNode, index) => (
            <span key={index}>{textNode.text}</span>
          ))}
        </p>
      );

    case NOTE_CONTENT_TYPE.CODE:
    case NOTE_CONTENT_TYPE.CODE_BLOCK: {
      const language = node.attrs?.language || "plaintext";
      const highlightedCode = hljs.highlight(node.content[0].text, {
        language: language,
      }).value;
      return (
        <pre className={`language-${language}`}>
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      );
    }

    case NOTE_CONTENT_TYPE.IMAGE:
      return (
        <div className="w-auto" style={{ height: "500px" }}>
          {node.content.map((textNode, index) => (
            <ImageContainer
              key={index}
              src={textNode.text}
              alt="Note content image"
              className="h-full w-full"
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}
