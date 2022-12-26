import { getFileContents } from '../file-utils';

export function day3() {
  const input = getFileContents(__dirname, 'input.txt');

  const rows = input.split('\n');

  let prioritySum = 0;

  rows.forEach((row) => {
    const firstHalf = row.slice(0, row.length / 2).split('');
    const secondHalf = row.slice(row.length / 2, row.length).split('');
    const letterFound = firstHalf.find((l) => secondHalf.includes(l))!;
    const charCode = letterFound.charCodeAt(0);

    if (charCode <= 90) {
      prioritySum += charCode - 38;
    } else {
      prioritySum += charCode - 96;
    }
  });

  console.log('Sum of all priorities:', prioritySum);
}
