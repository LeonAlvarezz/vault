import ImageContainer from "@/components/ui/image-container";
import { BlockNode, NOTE_CONTENT_TYPE } from "@/types/note.type";

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
      return (
        <pre>
          <code>
            {node.content.map((textNode, index) => (
              <span key={index}>{textNode.text}</span>
            ))}
          </code>
        </pre>
      );

    case NOTE_CONTENT_TYPE.CODE_BLOCK:
      return (
        <pre className="tiptap text-wrap">
          <code className="text-wrap">
            {node.content.map((textNode, index) => (
              <span key={index}>{textNode.text}</span>
            ))}
          </code>
        </pre>
      );

    case NOTE_CONTENT_TYPE.IMAGE:
      return (
        <div className="image-container">
          {node.content.map((textNode, index) => (
            <ImageContainer
              key={index}
              src={textNode.text}
              alt="Note content image"
              className="h-[400px] w-full"
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}
