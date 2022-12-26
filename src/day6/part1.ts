import { getFileContents } from '../file-utils';

export function day6() {
  const data = getFileContents(__dirname, 'input.txt');
  const arr = [data[0], data[1], data[2]];
  for (let i = 3; i < data.length; i++) {
    arr.push(data[i]);
    if (new Set(arr).size === 4) {
      console.log(i + 1);
      return;
    }
    arr.shift();
  }
}
