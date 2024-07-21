// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FC, memo } from "react";

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock: FC<any> = memo(({ language, value }) => {
  // TODO - Implement a code block component

  return <pre>{value}</pre>;
  // return (
  //   <div className="relative w-full font-sans codeblock bg-zinc-950">
  //     <SyntaxHighlighter
  //       language={language}
  //       style={coldarkDark}
  //       PreTag="div"
  //       showLineNumbers
  //       customStyle={{
  //         margin: 0,
  //         width: "100%",
  //         background: "transparent",
  //         padding: "1.5rem 1rem",
  //       }}
  //       lineNumberStyle={{
  //         userSelect: "none",
  //       }}
  //       codeTagProps={{
  //         style: {
  //           fontSize: "0.9rem",
  //           fontFamily: "var(--font-mono)",
  //         },
  //       }}
  //     >
  //       {value}
  //     </SyntaxHighlighter>
  //   </div>
  // );
});

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
