"use client";
import { codeToHtml } from "shiki";
import hljs from "highlight.js";
import { useEffect } from "react";
import "highlight.js/styles/default.css";

type Props = {
  code: string;
};

// export default async function CodeBlock({ code }: Props) {
//   console.log("code:", code);
//   const out = await codeToHtml(code, {
//     lang: "ts",
//     theme: "tokyo-night",
//   });

//   return <div dangerouslySetInnerHTML={{ __html: out }} />;
// }

export default async function CodeBlock({ code }: Props) {
  useEffect(() => {
    hljs.highlightAll();
  }, [code]);
  // const out = await codeToHtml(code, {
  //   lang: "ts",
  //   theme: "tokyo-night",
  // });

  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}
