import { parseProjectDescription } from "@/lib/project-description";

/**
 * Renders a project's `description`: paragraph text keeps its line breaks,
 * while directory trees and shell command blocks come out in a monospace
 * `<pre><code>` styled with the site's `.code-block` primitive.
 */
export function ProjectDescription({ text }: { text: string }) {
  return (
    <div className="space-y-5">
      {parseProjectDescription(text).map((block, i) =>
        block.type === "code" ? (
          <pre
            key={`${block.type}-${i}`}
            className="code-block overflow-x-auto p-4 text-xs leading-relaxed md:p-5"
          >
            <code className="font-mono">{block.text}</code>
          </pre>
        ) : (
          <p
            key={`${block.type}-${i}`}
            className="whitespace-pre-line text-base leading-relaxed opacity-80"
          >
            {block.text}
          </p>
        )
      )}
    </div>
  );
}