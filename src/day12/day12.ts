import { getFileContents } from '../file-utils';

export function day12(fileName: string) {
  const input = getFileContents(__dirname, fileName);
  const nodeMap = new NodeMap(input);
  console.log(nodeMap.startingNode.position);
  console.log(nodeMap.endingNode.position);
}

class Node {
  private _position: string;
  private _value: string;
  private _distance: number = Infinity;
  private _visited: boolean = false;
  private _map: NodeMap;

  constructor(row: number, col: number, value: string, map: NodeMap) {
    this._position = `${row}:${col}`;
    this._value = value;
    this._map = map;

    if (value === 'S') {
      this._distance = 0;
    }
  }

  get value() {
    return this._value;
  }

  get position() {
    return this._position;
  }
}

class NodeMap {
  nodes = new Map<string, Node>();

  startingNode: Node;
  endingNode: Node;

  constructor(input: string) {
    const lines = input.split('\n');
    lines.forEach((line, row) => {
      let col = 0;
      for (let value of line) {
        const node = new Node(row, col, value, this);
        this.nodes.set(node.position, node);

        if (node.value === 'S') {
          this.startingNode = node;
        } else if (node.value === 'E') {
          this.endingNode = node;
        }

        col++;
      }
    });
  }

  getNode(position: string) {
    return this.nodes.get(position);
  }
}
