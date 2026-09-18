export type DescriptionBlock =
  | { type: "paragraph"; text: string }
  | { type: "code"; text: string };

/**
 * Lines that only ever show up in a shell prompt or a directory tree.
 * Detecting them lets every project keep a plain-text `description` while
 * still rendering command blocks in monospace.
 */
const CODE_LINE =
  /^\s*(?:[├│─]|cd\s|npm\s|npx\s|yarn\s|pnpm\s|pip\s|python3?\s|uvicorn\s|docker\s|git\s|source\s|sudo\s|apt\s)/;

/**
 * Splits a project description into paragraph and code blocks.
 *
 * Blocks are simply blank-line separated, so adding a project means pasting
 * plain text into `data/projects.ts` — a block becomes monospace as soon as
 * one of its lines looks like a command or a tree branch.
 */
export function parseProjectDescription(description: string): DescriptionBlock[] {
  return description
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((text) => ({
      type: text.split("\n").some((line) => CODE_LINE.test(line)) ? "code" : "paragraph",
      text,
    }));
}