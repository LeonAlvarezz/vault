import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageContainer from "@/components/ui/image-container";
import { cn } from "@/lib/utils";
import NextImage from "next/image";

// Define a React component to handle image rendering
const CustomImage = ({ node, updateAttributes }: NodeViewProps) => {
  const { src, alt } = node.attrs;

  return (
    <NodeViewWrapper>
      <div className={cn("relative")}>
        <NextImage
          src={src}
          alt={alt}
          width={0}
          height={0}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          sizes="(max-width: 1250px) 100vw, 1250px"
        />
      </div>
    </NodeViewWrapper>
  );
};

// Extend the Tiptap Image extension to use the custom component
export const CustomImageExtension = Image.extend({
  // Override the addNodeView to use ReactNodeViewRenderer with CustomImage
  addNodeView() {
    return ReactNodeViewRenderer(CustomImage);
  },
});
