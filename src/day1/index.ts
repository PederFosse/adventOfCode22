import * as fs from 'fs';
import { getFileContents } from '../file-utils';

export function day1() {
  const inputData = getFileContents(__dirname, 'input-data.txt');

  const split = inputData.split('\n');

  let highestValue = 0;
  let currentValue = 0;
  split.forEach((caloryInput) => {
    if (caloryInput === '') {
      if (currentValue > highestValue) {
        highestValue = currentValue;
      }
      currentValue = 0;
      return;
    }
    const calory = parseInt(caloryInput);
    currentValue += calory;
  });

  console.log(highestValue);
}

export function day1part2() {
  const inputData = getFileContents(__dirname, 'input-data.txt');

  const split = inputData.split('\n');

  const topScores = {
    first: 0,
    second: 0,
    third: 0,
  };

  let currentValue = 0;

  split.forEach((caloryInput) => {
    if (caloryInput === '') {
      if (currentValue > topScores.third) {
        if (currentValue >= topScores.second) {
          topScores.third = topScores.second;

          if (currentValue >= topScores.first) {
            topScores.second = topScores.first;
            topScores.first = currentValue;
          } else {
            topScores.second = currentValue;
          }
        } else {
          topScores.third = currentValue;
        }
      }

      currentValue = 0;
      return;
    }
    const calory = parseInt(caloryInput);
    currentValue += calory;
  });

  console.log(topScores);
  console.log(
    'SUM:',
    Object.values(topScores).reduce((prev, cur) => prev + cur)
  );
}
