import { getFileContents } from '../file-utils';

export function day5() {
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
    for (let i = 0; i < Number(amount); i++) {
      crateTowers[to].push(crateTowers[from].pop());
    }
  });

  const result = Object.values(crateTowers)
    .map((e) => e[e.length - 1])
    .join('');

  console.log(result);
}
