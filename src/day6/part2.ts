import { getFileContents } from '../file-utils';

export function day6part2() {
  const data = getFileContents(__dirname, 'input.txt');
  const arr = [
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    data[5],
    data[6],
    data[7],
    data[8],
    data[9],
    data[10],
    data[11],
    data[12],
  ];
  for (let i = 13; i < data.length; i++) {
    arr.push(data[i]);
    if (new Set(arr).size === 14) {
      console.log(arr);
      console.log(i + 1);
      return;
    }
    arr.shift();
  }
}
