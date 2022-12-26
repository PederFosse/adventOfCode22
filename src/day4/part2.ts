import { getFileContents } from '../file-utils';

export function day4part2() {
  const data = getFileContents(__dirname, 'input.txt');
  const taskPairs = data.split('\n');

  let overlappingPairs = 0;

  taskPairs.forEach((pair) => {
    const [[startA, endA], [startB, endB]] = pair.split(',').map((p) => p.split('-').map((num) => Number(num)));

    if (startA <= endB && endA >= startB) {
      overlappingPairs++;
    }
  });

  console.log(overlappingPairs);
}
