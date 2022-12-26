import { RopeEnd } from './rope-end';
import { Direction } from './types';

export class Rope {
  head: RopeEnd;
  tail: RopeEnd;
  coordinatesVisitedByTail: Set<string> = new Set<string>();

  constructor() {
    this.head = new RopeEnd();
    this.tail = new RopeEnd();
    this.coordinatesVisitedByTail.add(this.tail.position.toString());
  }

  execute(command: string) {
    const [inputDirection, steps] = command.split(' ');

    let direction: Direction;
    switch (inputDirection) {
      case 'U':
        direction = 'up';
        break;
      case 'D':
        direction = 'down';
        break;
      case 'L':
        direction = 'left';
        break;
      case 'R':
        direction = 'right';
        break;
      default:
        throw new Error(`Received unknown direction: ${inputDirection}`);
    }

    for (let i = 0; i < Number(steps); i++) {
      this.head.move(direction);
      if (!this.tail.position.touches(this.head.position)) {
        this.tail.moveTowards(this.head);
        this.coordinatesVisitedByTail.add(this.tail.position.toString());
      }
    }
  }
}
