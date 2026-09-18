// Dev-only sanity check: confirms the design-system tokens and dark variant
// actually survived the Tailwind v4 build into the emitted CSS bundle.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

// Next 16 + Turbopack emits the page CSS under .next/static/chunks, not static/css
function findCss(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "dev") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) findCss(full, out);
    else if (entry.endsWith(".css")) out.push(full);
  }
  return out;
}

const files = findCss(join(process.cwd(), ".next"));

const checks = [
  [":where(.dark", /:where\(\.dark/],
  ["--surface token", /--surface:/],
  [".btn-primary", /btn-primary/],
  [".text-gradient", /text-gradient/],
  [".field", /\.field/],
  [".skeleton", /\.skeleton/],
  [".chip-active", /chip-active/],
  ["color-mix()", /color-mix/],
  ["reduced-motion guard", /prefers-reduced-motion/],
  [".overlay", /\.overlay/],
  [".tilt", /\.tilt/],
];

for (const file of files) {
  const css = readFileSync(file, "utf8");
  console.log(`\nFILE ${file.replace(process.cwd(), "")} (${css.length} bytes)`);
  for (const [label, re] of checks) {
    console.log(`  ${re.test(css) ? "PASS" : "FAIL"}  ${label}`);
  }
}