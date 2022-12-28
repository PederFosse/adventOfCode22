import { getFileContents } from '../file-utils';
import { Monkey } from './monkey';

export function day11(fileName: string, rounds: number): number {
  const contents = getFileContents(__dirname, fileName);

  const inputLines = contents.split('\n');
  const monkeys: Monkey[] = [];

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

  for (let round = 0; round < rounds; round++) {
    monkeys.forEach((monkey) => {
      monkey.inspectItems(monkeys);
    });
  }

  const sortedResults = monkeys.map((m) => m.getInspectionCount()).sort((a, b) => b - a);

  return sortedResults[0] * sortedResults[1];
}
