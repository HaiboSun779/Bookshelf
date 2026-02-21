import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const distHtmlPath = resolve(process.cwd(), 'dist/index.html')

const html = await readFile(distHtmlPath, 'utf8')
const updatedHtml = html.replace('<script type="module" crossorigin>', '<script defer>')

if (updatedHtml !== html) {
  await writeFile(distHtmlPath, updatedHtml, 'utf8')
  console.log('Patched dist/index.html for file:// opening.')
} else {
  console.log('No module script tag found to patch.')
}
