import { Knot } from './rope-end';
import { Direction } from './types';

export class Rope {
  head: Knot;

  constructor(knots: number) {
    this.head = new Knot(knots - 1);
  }

  getTail(): Knot {
    let knot = this.head;
    while (knot.next !== undefined) {
      knot = knot.next;
    }
    return knot;
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

    this.head.executeCommand(direction, Number(steps));
  }
}
