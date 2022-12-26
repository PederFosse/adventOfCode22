import { Coordinate } from './coordinate';
import { Direction } from './types';

export class RopeEnd {
  position: Coordinate;

  constructor(x: number = 0, y: number = 0) {
    this.position = new Coordinate(x, y);
  }

  moveTowards(target: RopeEnd) {
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
