import { getFileContents } from '../file-utils';

export function day4() {
  const data = getFileContents(__dirname, 'input.txt');
  const taskPairs = data.split('\n');

  let overlappingPairs = 0;

  taskPairs.forEach((pair) => {
    const [[leftStart, leftEnd], [rightStart, rightEnd]] = pair
      .split(',')
      .map((p) => p.split('-').map((num) => Number(num)));

    if ((leftStart <= rightStart && leftEnd >= rightEnd) || leftStart >= rightStart && leftEnd <= rightEnd) {
      overlappingPairs++;
    }
  });

  console.log(overlappingPairs);
}
