import { getFileContents } from '../file-utils';
import { Filesystem } from './filesystem/filestystem';

export function day7() {
  const input = getFileContents(__dirname, 'input.txt').split('\n');
  const filesystem = new Filesystem();
  input.forEach((line) => {
    filesystem.execute(line);
  });
  console.log('Totalsize:', filesystem.topDir.sumSizes());
}
