// Generates the optimized public assets from the source portrait.
// The heavy original lives in assets/ (not public/) so it is never shipped.
//   public/profile.webp        - display image for the hero (was a 1527 KB PNG)
//   app/opengraph-image.jpg    - 1200x630 branded social card
//   app/twitter-image.jpg      - same card for Twitter/X
// Run with: node scripts/optimize-images.mjs
import { mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const SOURCE = join(root, "assets", "profile-source.png");
const FONT_STACK = "'Segoe UI', Inter, Arial, Helvetica, sans-serif";

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/** sharp renders SVG text only when a matching font is installed. */
async function textRenders() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
    <rect width="400" height="120" fill="white"/>
    <text x="20" y="80" font-family="${FONT_STACK}" font-size="60" font-weight="700" fill="black">TEST</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const { channels } = await sharp(png).stats();
  return channels[0].min < 100; // dark pixels exist => glyphs were drawn
}

/** 1. Display image: capped at 900px wide (~2x the 400px render box). */
async function buildProfile() {
  const out = join(root, "public", "profile.webp");
  await sharp(SOURCE)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  console.log(`profile.webp      ${kb(statSync(out).size)}  (source ${kb(statSync(SOURCE).size)})`);
}

/** 2. Branded 1200x630 social card. */
async function buildOg(withText) {
  const W = 1200;
  const H = 630;

  const background = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0b1120"/>
        <stop offset="55%" stop-color="#151a3a"/>
        <stop offset="100%" stop-color="#0b1120"/>
      </linearGradient>
      <radialGradient id="glowA" cx="18%" cy="15%" r="45%">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowB" cx="88%" cy="85%" r="50%">
        <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowC" cx="70%" cy="10%" r="40%">
        <stop offset="0%" stop-color="#a855f7" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glowA)"/>
    <rect width="${W}" height="${H}" fill="url(#glowC)"/>
    <rect width="${W}" height="${H}" fill="url(#glowB)"/>
    <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#ffffff" stroke-opacity="0.12"/>
    ${
      withText
        ? `<g font-family="${FONT_STACK}">
             <text x="80" y="196" font-size="26" letter-spacing="6" fill="#a5b4fc">PORTFOLIO</text>
             <text x="80" y="292" font-size="76" font-weight="700" fill="#ffffff">Shayan Dutta</text>
             <text x="80" y="356" font-size="32" fill="#c7d2fe">DevOps &amp; Cloud Engineer</text>
             <rect x="80" y="404" width="96" height="5" rx="2.5" fill="#818cf8"/>
             <text x="80" y="470" font-size="24" fill="#94a3b8">Java &#183; Spring Boot &#183; Docker &#183; Jenkins &#183; AWS</text>
             <text x="80" y="546" font-size="22" fill="#67e8f9">royalbong.github.io/my-portfolio</text>
           </g>`
        : ""
    }
  </svg>`;

  // Circular avatar so the portrait reads as a profile badge, not a cropped photo.
  const size = 340;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );
  const avatar = await sharp(SOURCE)
    .resize(size, size, { fit: "cover", position: "attention" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const card = await sharp(Buffer.from(background))
    .composite([{ input: avatar, left: W - size - 110, top: (H - size) / 2 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  for (const target of ["app/opengraph-image.jpg", "app/twitter-image.jpg"]) {
    const out = join(root, ...target.split("/"));
    mkdirSync(join(out, ".."), { recursive: true });
    await sharp(card).toFile(out);
    console.log(`${target.padEnd(18)}${kb(statSync(out).size)}`);
  }
}

const withText = await textRenders();
console.log(`SVG text support  ${withText ? "YES" : "NO - card will omit labels"}\n`);
await buildProfile();
await buildOg(withText);
