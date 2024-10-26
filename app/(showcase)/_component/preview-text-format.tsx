import React from "react";
import hljs from "highlight.js";
export default function PreviewTextFormat() {
  const highlightedCode = hljs.highlight(`const vault = "Awesome"`, {
    language: "javascript",
  }).value;
  return (
    <div className="min-h-[300px] w-[200px] border border-neutral-700/50 -right-12 xl:-right-24 p-4 mt-6 tiptap rounded-sm absolute overflow-hidden animated-border-box">
      <div className="bg-gradient-to-b from-neutral-900/10 to-neutral-900  absolute top-0 left-0 w-full h-full "></div>
      <p className="flex text-[1.5rem]">Heading 1</p>
      <p className="text-sm">Hello</p>
      <code className="w-fit px-2">Code</code>
      <pre className={`language-javascript mt-0 no-scrollbar`}>
        <code
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
      </pre>
      <a className="">Vault</a>
    </div>
  );
}
