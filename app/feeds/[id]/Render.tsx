import { BlockNode, NOTE_CONTENT_TYPE } from "@/types/note.type";
import { renderNote } from "@/lib/renderNote";
type Props = {
  data?: any[] | null;
};
export default async function Render(props: Props) {
  const content: BlockNode[] = [
    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "Web Development in 2024: The Evolution of React and Modern Frontend Practices",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "As we delve into 2024, the landscape of web development continues to evolve at a rapid pace. React, one of the most popular JavaScript libraries for building user interfaces, has maintained its position at the forefront of frontend development. With its component-based architecture and virtual DOM, React offers developers a powerful toolset for creating dynamic and efficient web applications. In this article, we'll explore some of the latest trends and best practices in React development.",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.IMAGE,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx-2048x1024.jpg",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "One of the key aspects of staying current with React development is keeping your dependencies up to date. To ensure you're using the latest version of React, you can use the following npm command:",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.CODE,
      attrs: {
        language: "javascript",
      },
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "npm install react@latest",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "React 19, released in early 2024, introduced several new features and improvements. These include enhanced server-side rendering capabilities, improved concurrent mode stability, and new hooks for more efficient state management. Developers are now able to create even more performant applications with less boilerplate code.",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "Another trend we're seeing in 2024 is the increased adoption of TypeScript in React projects. TypeScript, a typed superset of JavaScript, helps catch errors early in the development process and improves code maintainability. Many developers are finding that the initial investment in learning TypeScript pays off in the long run, especially for larger projects.",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.CODE_BLOCK,
      attrs: {
        language: "javascript",
      },
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: `import React, { useState } from 'react';
  
  interface Props {
    initialCount: number;
  }
  
  const Counter: React.FC<Props> = ({ initialCount }) => {
    const [count, setCount] = useState(initialCount);
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  };
  
  export default Counter;`,
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "The example above demonstrates a simple React component written in TypeScript. Notice how we're able to define the type of the props, making our code more robust and self-documenting.",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "As we look to the future of web development, it's clear that the focus on performance and user experience will continue to drive innovation. Technologies like Web Assembly are becoming more prevalent, allowing developers to write high-performance code in languages other than JavaScript and run it in the browser. This opens up new possibilities for complex web applications that require near-native speed.",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.IMAGE,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "https://images.unsplash.com/photo-1720048169970-9c651cf17ccd?q=80&w=2814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
    },

    {
      type: NOTE_CONTENT_TYPE.PARAGRAPH,
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          text: "In conclusion, the world of web development continues to be an exciting and dynamic field. By staying up-to-date with the latest trends and technologies, developers can create more efficient, maintainable, and user-friendly applications. Whether you're working with React, exploring new frameworks, or pushing the boundaries of what's possible in the browser, there's never been a better time to be a web developer.",
        },
      ],
    },
  ];

  return (
    <div className="tiptap dark:text-white text-slate-800 flex flex-col gap-2">
      {content.map((content, index) => (
        <div key={index}>{renderNote(content)}</div>
      ))}
    </div>
  );
}
