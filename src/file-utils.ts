import { readFileSync } from 'fs';

export function getFileContents(dirname: string, file: string): string {
  return readFileSync(`${dirname}/${file}`, 'utf-8');
}
