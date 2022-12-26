import { getFileContents } from '../file-utils';
import { Forest } from './forest/forest';
import { Tree } from './forest/tree';

export function day8() {
  const data = getFileContents(__dirname, 'input.txt').split('\n');
  const forest = new Forest();

  let visibleTrees = 0;

  data.forEach((treeLine) => {
    forest.addTreeLine(treeLine.split(''));
  });

  // Set trees that are visible west -> east & east -> west
  forest.treeLines.forEach((line) => {
    setVisibleTrees(line.trees);
    setVisibleTrees([...line.trees].reverse());
  });

  // Set trees that are visible from north  ->  south & south -> north
  // Assuming each treeline has equal amount of trees
  for (let i = 0; i < forest.treeLines[0].trees.length; i++) {
    const lineToCheck = forest.treeLines.map((line) => line.trees[i]);
    setVisibleTrees(lineToCheck);
    setVisibleTrees([...lineToCheck].reverse());
  }

  forest.treeLines.forEach((line) =>
    line.trees.forEach((tree) => {
      if (tree.isVisible()) visibleTrees++;
    })
  );
  console.log(`There is ${visibleTrees} trees visible from the outside`);
}

function setVisibleTrees(trees: Tree[]): void {
  let tallestHeight = trees[0].getHeight();
  trees.forEach((tree, treeIndex) => {
    if (treeIndex === 0) {
      // first or last trees are visible
      tree.setVisible();
      return;
    }

    if (tallestHeight < tree.getHeight()) {
      tree.setVisible();
      tallestHeight = tree.getHeight();
    }
  });
}
