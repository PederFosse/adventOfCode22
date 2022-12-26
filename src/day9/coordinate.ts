export class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `(${this.x},${this.y})`;
  }

  touches(coordinate: Coordinate): boolean {
    if ([-1, 0, 1].includes(this.x - coordinate.x) && [-1, 0, 1].includes(this.y - coordinate.y)) return true;
    return false;
  }
}
