import { getFileContents } from '../file-utils';
import { KeepAway } from './KeepAway';
import { Monkey } from './monkey';

export function day11(fileName: string, part: 1 | 2): number {
  const contents = getFileContents(__dirname, fileName);

  const inputLines = contents.split('\n');
  const monkeys: Monkey[] = [];

  // Generate monkeys
  let i = 0;
  while (i < inputLines.length) {
    const input: string[] = [];
    const iPlusFive = i + 5;
    for (i; i < iPlusFive + 1; i++) {
      input.push(inputLines[i]);
    }
    monkeys.push(new Monkey(input));
    i++;
  }

  const game = new KeepAway(part, monkeys);
  game.play();

  const sortedResults = monkeys.map((m) => m.inspectionCount).sort((a, b) => b - a);

  return sortedResults[0] * sortedResults[1];
}
