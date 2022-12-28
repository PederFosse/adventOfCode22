import { getFileContents } from '../file-utils';
import { Rope } from './rope';

export function day9(fileName: string, ropeLength: number): number {
  const contents = getFileContents(__dirname, fileName).split('\n');
  const rope = new Rope(ropeLength);
  contents.forEach((instruction) => {
    rope.execute(instruction);
  });

  return rope.getTail().coordinatesVisited.size;
}
