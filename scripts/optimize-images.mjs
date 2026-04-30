/**
 * Image optimization script using sharp (already bundled with Next.js).
 * Produces:
 *   - Optimized progressive JPG  (max 1920px wide, 82% quality, stripped EXIF)
 *   - WebP version               (max 1920px wide, 82% quality)
 *
 * Usage:  node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { statSync, renameSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '../public');

const TARGETS = [
  'kitchenremodelbefore.jpg',
  'kitchenremodelafter.jpg',
];

const MAX_WIDTH  = 1920;
const JPG_QUALITY = 82;
const WEBP_QUALITY = 82;

function mb(bytes) {
  return (bytes / 1_048_576).toFixed(2) + ' MB';
}

for (const filename of TARGETS) {
  const input  = resolve(PUBLIC, filename);
  const tmpJpg = resolve(PUBLIC, `_opt_${filename}`);
  const webp   = resolve(PUBLIC, filename.replace(/\.jpe?g$/i, '.webp'));

  const originalSize = statSync(input).size;
  console.log(`\n📷  ${filename}  (original: ${mb(originalSize)})`);

  // ── Optimized JPG ──────────────────────────────────────
  await sharp(input)
    .rotate()                          // auto-rotate from EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({
      quality:     JPG_QUALITY,
      progressive: true,               // progressive JPEG
      mozjpeg:     true,               // better compression via mozjpeg encoder
    })
    .withMetadata(false)               // strip ALL metadata (EXIF, ICC stripped)
    .toFile(tmpJpg);

  const jpgSize = statSync(tmpJpg).size;
  const jpgSaved = (((originalSize - jpgSize) / originalSize) * 100).toFixed(1);
  console.log(`   ✅  Optimized JPG : ${mb(jpgSize)}  (saved ${jpgSaved}%)`);

  // Replace original with optimised version
  renameSync(tmpJpg, input);

  // ── WebP ───────────────────────────────────────────────
  await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .withMetadata(false)
    .toFile(webp);

  const webpSize = statSync(webp).size;
  const webpSaved = (((originalSize - webpSize) / originalSize) * 100).toFixed(1);
  console.log(`   ✅  WebP          : ${mb(webpSize)}  (saved ${webpSaved}%)`);
}

console.log('\n✨  All images optimized and ready for production.\n');
