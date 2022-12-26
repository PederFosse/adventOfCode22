import { getFileContents } from '../file-utils';
import { Rope } from './rope';

export function day9(fileName: string): number {
  const contents = getFileContents(__dirname, fileName).split('\n');
  const rope = new Rope();
  contents.forEach((instruction) => {
    rope.execute(instruction);
  });
  return rope.coordinatesVisitedByTail.size;
}
