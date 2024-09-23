import { NodeViewWrapper, NodeViewProps, Node } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageContainer from "@/components/ui/image-container";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { dropImagePlugin, UploadFn } from "@/lib/dropImagePlugin";

// Define a React component to handle image rendering
const CustomImage = ({ node, updateAttributes }: NodeViewProps) => {
  const { src, alt } = node.attrs;
  if (!src) {
    return (
      <NodeViewWrapper>
        <div className="w-full h-56 bg-neutral-600 animate-pulse"></div>
      </NodeViewWrapper>
    );
  }
  return (
    <NodeViewWrapper>
      <>
        <div className={cn("relative ")}>
          <NextImage
            src={src}
            alt={alt}
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            sizes="(max-width: 1250px) 100vw, 1250px"
          />
        </div>
      </>
    </NodeViewWrapper>
  );
};

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
    };
  }
}

// Extend the Tiptap Image extension to use the custom component
export const CustomImageExtension = (uploadFn: UploadFn) => {
  return Node.create({
    name: "image",
    group: "inline",
    draggable: true,
    addAttributes: () => ({
      src: {},
      alt: { default: null },
      title: { default: null },
    }),
    parseHTML: () => [
      {
        tag: "img[src]",
        getAttrs: (dom) => {
          if (typeof dom === "string") return {};
          const element = dom as HTMLImageElement;

          return {
            src: element.getAttribute("src"),
            title: element.getAttribute("title"),
            alt: element.getAttribute("alt"),
          };
        },
      },
    ],
    renderHTML: ({ HTMLAttributes }) => ["img", HTMLAttributes],
    // @ts-ignore
    addCommands() {
      return {
        setImage:
          (attrs) =>
          ({ state, dispatch }) => {
            const { selection } = state;
            const position = selection.$head
              ? selection.$head.pos
              : selection.$to.pos;

            const node = this.type.create(attrs);
            const transaction = state.tr.insert(position, node);
            return dispatch?.(transaction);
          },
      };
    },
    addNodeView() {
      return ReactNodeViewRenderer(CustomImage);
    },
    addProseMirrorPlugins() {
      return [dropImagePlugin(uploadFn)];
    },
    inline: true,
  });
};
