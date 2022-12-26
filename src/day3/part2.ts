import { getFileContents } from '../file-utils';

export function day3part2() {
  const input = getFileContents(__dirname, 'input.txt');

  const rows = input.split('\n');

  let possibilities: string[] = [];
  let counter = 0;
  let priorityPoints = 0;

  rows.forEach((row, index, self) => {
    if (counter === 3 || index === self.length - 1) {
      const charCode = possibilities[0].charCodeAt(0);

      if (charCode <= 90) {
        priorityPoints += charCode - 38;
      } else {
        priorityPoints += charCode - 96;
      }

      counter = 0;
      possibilities = [];
    }

    if (counter === 0) {
      possibilities = row.split('');
    }

    possibilities = possibilities.filter((entry) => row.includes(entry));
    counter++;
  });

  console.log(priorityPoints);
}
