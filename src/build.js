/* eslint-disable no-await-in-loop */
import { join } from 'path';
import { readFile, readdir, writeFile } from 'fs/promises';

import { parse } from './parser.js';
import { skraTemplate, makeHTML, makeIndex } from './make-html.js';
import { mkdir } from 'fs';
import { direxists } from './lib/file.js';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  const files = await readdir(DATA_DIR);

  if (!(await direxists (OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const skrar = [];

  for (const file of files) {
    const path = join(DATA_DIR, file);

    const data = await readFile(path);
    const str = data.toString('utf-8');
    const parsed = parse(str);
   // console.log(file);
   // console.log(parsed);
   // if (parsed[0] === 'No Numbers') console.log(parsed);
    const html = makeHTML(file, parsed);
    const skra = skraTemplate(file, html, true);

    const slug = file.slice(0, -4);
    skrar.push(slug);
    const filename = join(OUTPUT_DIR, `${slug}.html`);
    await writeFile(filename, skra);

    const index = skraTemplate("Töluleg Greining: Skrár 1-12", makeIndex (skrar));
    await writeFile(join(OUTPUT_DIR, "index.html"), index);

  }
}

main().catch((err) => console.error(err));
