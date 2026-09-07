import fs from 'fs';
import path from 'path';

// Reads a co-located content fragment (extracted page markup/CSS/JS) from
// /content at request time. Keeping large hand-authored HTML/CSS/JS out of
// .js template literals avoids backtick/${} escaping hazards in the original
// markup (the discovery-form script uses both extensively).
export function readContent(relPath) {
  return fs.readFileSync(path.join(process.cwd(), 'content', relPath), 'utf8');
}
