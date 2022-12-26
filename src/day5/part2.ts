import { getFileContents } from '../file-utils';

export function day5part2() {
  const data = getFileContents(__dirname, 'input.txt');
  const [crateSetup, instructions] = data.split('\n\n').map((e) => e.split('\n'));

  const crateTowers: Record<string, string[]> = {};
  const lastSetupRow = crateSetup.pop();
  for (let i = 0; i < lastSetupRow.length; i++) {
    if (lastSetupRow[i].trim() !== '') {
      crateTowers[lastSetupRow[i]] = [];
    }
  }

  const formattedSetup = crateSetup.map((c) => c.split('    ').flatMap((e) => e.split(' ')));
  formattedSetup.forEach((row) => {
    row.forEach((crate, index) => {
      if (crate !== '') {
        crateTowers[index + 1].unshift(crate[1]);
      }
    });
  });

  instructions.forEach((instruction) => {
    const [amount, from, to] = instruction.split(/[^0-9]+/).filter((e) => e !== '');
    const fromTower = crateTowers[from];
    const boxesToMove = fromTower.splice(fromTower.length - Number(amount));
    crateTowers[to].push(...boxesToMove);
  });

  const result = Object.values(crateTowers)
    .map((e) => e[e.length - 1])
    .join('');

  console.log(result);
}
