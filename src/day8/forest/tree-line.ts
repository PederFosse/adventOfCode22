import { Tree } from "./tree";

export class TreeLine {
  trees: Tree[];
  constructor(trees: string[]) {
    this.trees = trees.map((t) => new Tree(Number(t)));
  }
}