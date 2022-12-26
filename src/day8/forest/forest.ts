import { TreeLine } from "./tree-line";

export class Forest {
  treeLines: TreeLine[] = [];

  addTreeLine(trees: string[]) {
    this.treeLines.push(new TreeLine(trees));
  }
}
