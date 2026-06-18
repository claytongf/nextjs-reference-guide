import type { Quiz } from "@/lib/quiz/schema";

export const webSecurity: Quiz = {
  slug: "web-security",
  title: "Web Security",
  description:
    "XSS, CSRF, injection, auth, and data exposure — vulnerabilities and their fixes.",
  track: "security",
  questions: [
    {
      id: "client-validation",
      prompt: "What is client-side validation good for?",
      options: [
        "Security — it stops attackers",
        "User experience only; never trust it for security",
        "Replacing server checks",
        "Encrypting data",
      ],
      answerIndex: 1,
      explanation:
        "Anyone can bypass the client with raw requests. Client validation improves UX, but every rule must be re-enforced on the server.",
    },
    {
      id: "xss-source",
      prompt: "Which is the most common way to introduce XSS in a React app?",
      options: [
        "Interpolating a value with {value} in JSX",
        "Using dangerouslySetInnerHTML with unsanitized input",
        "Using useState",
        "Rendering a list with keys",
      ],
      answerIndex: 1,
      explanation:
        "React escapes {value} by default. dangerouslySetInnerHTML bypasses escaping — sanitize (e.g. DOMPurify) before using it, or avoid it.",
    },
    {
      id: "session-storage",
      prompt: "Where should a session token be stored?",
      options: [
        "localStorage",
        "A regular JavaScript variable",
        "An HttpOnly, Secure, SameSite cookie",
        "The URL query string",
      ],
      answerIndex: 2,
      explanation:
        "HttpOnly cookies are invisible to JavaScript, so XSS can't steal them. localStorage is readable by any script on the page.",
    },
    {
      id: "injection-fix",
      prompt: "What is the universal fix for injection (SQL, command, etc.)?",
      options: [
        "Escape quotes manually",
        "Separate code from data — parameterized queries / argument arrays",
        "Hide the error messages",
        "Use a faster database",
      ],
      answerIndex: 1,
      explanation:
        "Keep the command fixed and pass input as parameters so it's treated as data, never executable structure. Validate inputs too.",
    },
    {
      id: "idor",
      prompt: "How do you prevent IDOR (insecure direct object reference)?",
      options: [
        "Use random-looking ids",
        "Scope every query to the authenticated user / check ownership",
        "Hide the id from the URL",
        "Rate-limit the endpoint",
      ],
      answerIndex: 1,
      explanation:
        "Authorize in the query itself (where: { id, ownerId: user.id }). Obscure ids are not access control — ownership must be enforced server-side.",
    },
    {
      id: "next-public",
      prompt: "What does the NEXT_PUBLIC_ prefix on an env var mean?",
      options: [
        "It encrypts the value",
        "The value is inlined into the client bundle and visible to everyone",
        "It is only available on the server",
        "It is required for all env vars",
      ],
      answerIndex: 1,
      explanation:
        "NEXT_PUBLIC_ publishes the value to the browser. Never prefix secrets — only genuinely public values (analytics IDs, public URLs).",
    },
  ],
};
