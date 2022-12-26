import { getFileContents } from '../file-utils';

export function day2part2() {
  const input = getFileContents(__dirname, 'input.txt');

  const games = input.split('\n');
  let score = 0;

  games.forEach((game) => {
    const [opponentChoice, requiredOutcome] = game.split(' ');

    const opponentPointsByChoice = opponentChoice.charCodeAt(0) - 64;

    switch (requiredOutcome) {
      case 'X': // Loose - only get points based on loosing choice
        score += opponentPointsByChoice === 1 ? 3 : opponentPointsByChoice - 1;
        break;
      case 'Y': // Draw - gets 3 points and the same points by choice as the opponent
        score += 3 + opponentPointsByChoice;
        break;
      case 'Z': // Win - gets 6 points, along with 1, 2 or 3 points based on winning choice
        score += 6 + (opponentPointsByChoice === 3 ? 1 : opponentPointsByChoice + 1);
        break;
      default:
        throw new Error('This should never happen');
    }
  });

  console.log('Done:', score);
}
