import { getFileContents } from '../file-utils';

export function day2() {
  const input = getFileContents(__dirname, 'input.txt');

  const games = input.split('\n');
  let score = 0;

  games.forEach((game) => {
    const [opponentChoice, myChoice] = game.split(' ');
    const scoreByChoice = myChoice.charCodeAt(0) - 87;
    score += scoreByChoice;
    if (opponentChoice.charCodeAt(0) - 64 === scoreByChoice) {
      score += 3;
      return;
    }

    if (
      (opponentChoice === 'A' && myChoice === 'Y') ||
      (opponentChoice === 'B' && myChoice === 'Z') ||
      (opponentChoice === 'C' && myChoice === 'X')
    ) {
      score += 6;
    }
  });

  console.log('Done:', score);
}
