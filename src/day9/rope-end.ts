import { Coordinate } from './coordinate';
import { Direction } from './types';

export class Knot {
  position: Coordinate;
  next?: Knot;
  coordinatesVisited: Set<string> = new Set<string>();

  constructor(moreKnots: number) {
    this.position = new Coordinate(0, 0);
    this.coordinatesVisited.add(this.position.toString());
    if (moreKnots !== 0) {
      this.next = new Knot(moreKnots - 1);
    }
  }

  executeCommand(direction: Direction, steps: number) {
    for (let i = 0; i < Number(steps); i++) {
      this.move(direction);
      if (this.next) {
        this.next.follow(this);
      }
    }
  }

  follow(target: Knot) {
    if (this.position.touches(target.position)) {
      return;
    }

    if (this.position.x === target.position.x) {
      if (this.position.y < target.position.y) {
        this.move('up');
      } else {
        this.move('down');
      }
    } else if (this.position.y === target.position.y) {
      if (this.position.x < target.position.x) {
        this.move('right');
      } else {
        this.move('left');
      }
    } else {
      if (this.position.x < target.position.x) {
        this.move('right');
      } else if (this.position.x > target.position.x) {
        this.move('left');
      }

      if (this.position.y < target.position.y) {
        this.move('up');
      } else if (this.position.y > target.position.y) {
        this.move('down');
      }
    }

    this.coordinatesVisited.add(this.position.toString());
    if (this.next) {
      this.next.follow(this);
    }
  }

  move(direction: Direction) {
    switch (direction) {
      case 'up':
        this.position.y++;
        break;
      case 'down':
        this.position.y--;
        break;
      case 'right':
        this.position.x++;
        break;
      case 'left':
        this.position.x--;
        break;
      default:
        const _exhaustiveCheck: never = direction;
    }
  }
}
