import { getFileContents } from '../file-utils';
import { Forest } from './forest/forest';

export function day8part2() {
  const data = getFileContents(__dirname, 'input.txt').split('\n');
  const forest = new Forest();

  data.forEach((treeLine) => {
    forest.addTreeLine(treeLine.split(''));
  });

  const best = {
    height: 0,
    score: 0,
  };

  forest.treeLines.forEach((treeLine, lineIndex) => {
    treeLine.trees.forEach((tree, treeIndex) => {
      const currentHeight = tree.getHeight();

      const horisontalRow = treeLine.trees;

      // How many trees are visible to the west?
      let scoreToWest = 0;
      let i = treeIndex;
      while (i > 0 && horisontalRow[i - 1].getHeight() < tree.getHeight()) {
        scoreToWest++;
        i--;
      }

      if (i !== 0) {
        scoreToWest++;
      }

      // how many trees are visible to the east?
      let scoreToEast = 0;
      i = treeIndex;
      while (i < horisontalRow.length - 1 && horisontalRow[i + 1].getHeight() < tree.getHeight()) {
        scoreToEast++;
        i++;
      }

      if (i !== horisontalRow.length - 1) {
        scoreToEast++;
      }

      const verticalRow = forest.treeLines.map((line) => line.trees[treeIndex]);

      //console.log('Line index:', lineIndex);
      // how many trees are visible to the north?
      let scoreToNorth = 0;
      i = lineIndex;
      while (i > 0 && verticalRow[i - 1].getHeight() < tree.getHeight()) {
        scoreToNorth++;
        i--;
      }

      if (i !== 0) {
        scoreToNorth++;
      }

      // how many trees are visible to the south?
      let scoreToSouth = 0;
      i = lineIndex;
      while (i < verticalRow.length - 1 && verticalRow[i + 1].getHeight() < tree.getHeight()) {
        scoreToSouth++;
        i++;
      }

      if (i !== verticalRow.length - 1) {
        scoreToSouth++;
      }

      const score = scoreToNorth * scoreToSouth * scoreToEast * scoreToWest;
      if (score > best.score) {
        (best.height = tree.getHeight()), (best.score = score);
      }
    });
  });

  console.log(best);
  //console.log(forest.treeLines.map((line) => line.trees.map((t) => ({ height: t.getHeight(), score: t.totalScore }))));
}
