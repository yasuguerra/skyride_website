import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/components/pages/service-page.tsx',
];

const replacements = [
  ['\u00e2\u0080\u0094', '\u2014'],   // â€" → — (em dash)
  ['\u00e2\u0080\u0099', '\u2019'],   // â€™ → ' (right single quote)
  ['\u00e2\u0080\u009c', '\u201c'],   // â€œ → " (left double quote)
  ['\u00e2\u0080\u009d', '\u201d'],   // â€ → " (right double quote)
  ['\u00e2\u009c\u0093', '\u2713'],   // âœ" → ✓ (checkmark)
  ['\u00e2\u0080\u00a2', '\u2022'],   // â€¢ → • (bullet)
];

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  let changed = 0;
  for (const [bad, good] of replacements) {
    const count = content.split(bad).length - 1;
    if (count > 0) {
      console.log(`${file}: "${bad}" (${bad.split('').map(c=>c.charCodeAt(0).toString(16)).join(' ')}) → "${good}" × ${count}`);
      content = content.split(bad).join(good);
      changed += count;
    }
  }
  if (changed > 0) {
    writeFileSync(file, content, 'utf8');
    console.log(`✓ Written ${file} (${changed} fixes)`);
  } else {
    console.log(`✓ ${file}: no remaining patterns`);
  }
}
