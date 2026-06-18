import type { Quiz } from "@/lib/quiz/schema";

export const reactFundamentals: Quiz = {
  slug: "react-fundamentals",
  title: "React Fundamentals",
  description:
    "JSX, props, state, events, lists, and conditional rendering — the basics every React dev needs.",
  track: "junior",
  questions: [
    {
      id: "jsx-compiles-to",
      prompt: "What does JSX compile to?",
      options: [
        "An HTML string injected into the page",
        "Plain JavaScript function calls that return element objects",
        "A template parsed at runtime by the browser",
        "A CSS-in-JS stylesheet",
      ],
      answerIndex: 1,
      explanation:
        "JSX is syntax sugar: each tag compiles to a function call (e.g. jsx('h1', ...)) that returns a lightweight object describing the UI.",
    },
    {
      id: "props-mutability",
      prompt: "Which statement about props is correct?",
      options: [
        "A component may modify its own props to update the UI",
        "Props are read-only from the child's perspective",
        "Props can only be strings",
        "Props automatically trigger a network request",
      ],
      answerIndex: 1,
      explanation:
        "Data flows down and props are read-only in the child. To change something, the owner updates state or the child calls a callback prop.",
    },
    {
      id: "key-choice",
      prompt: "What should you use as the key when rendering a dynamic list?",
      options: [
        "The array index",
        "Math.random() on each render",
        "A stable, unique id from the data",
        "The element's text content",
      ],
      answerIndex: 2,
      explanation:
        "Stable ids let React match items across renders. Index keys break on reorder/insert/delete; random keys remount every item and lose state.",
    },
    {
      id: "conditional-zero-trap",
      prompt: "Why can `{count && <Badge />}` render the number 0?",
      options: [
        "Because React renders falsy numbers but not other falsy values",
        "Because && always returns a boolean",
        "Because <Badge /> is undefined",
        "Because count is a string",
      ],
      answerIndex: 0,
      explanation:
        "When count is 0, the expression evaluates to 0 — a valid, rendered React child. Guard with `count > 0 && <Badge />`.",
    },
    {
      id: "event-handler-pass",
      prompt: "Which correctly wires a click handler?",
      options: [
        "onClick={handleClick()}",
        "onClick={handleClick}",
        "onClick=handleClick",
        "onclick={handleClick}",
      ],
      answerIndex: 1,
      explanation:
        "Pass the function reference. Calling it (handleClick()) runs it during render; the prop is camelCase onClick, and the value needs braces.",
    },
    {
      id: "controlled-input",
      prompt: "What makes an input 'controlled' in React?",
      options: [
        "It has the `controlled` attribute",
        "Its value comes from state and updates via onChange",
        "It uses a ref to read the DOM on submit",
        "It is wrapped in a <form>",
      ],
      answerIndex: 1,
      explanation:
        "A controlled input's value is driven by React state and written back on every change, making state the single source of truth.",
    },
  ],
};
