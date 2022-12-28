import { Coordinate } from '../coordinate';
import { Knot } from '../rope-end';

describe('Touching', () => {
  it('Returns true of the coordinates are the equal', () => {
    const main = new Coordinate(5, 5);
    const A = new Coordinate(5, 5);
    expect(main.touches(A)).toBe(true);
    expect(A.touches(main)).toBe(true);
  });

  it('Correctly evaluates if coordinates are touching horisontally', () => {
    const main = new Coordinate(5, 5);

    const A = new Coordinate(4, 5);
    const B = new Coordinate(6, 5);
    const C = new Coordinate(3, 5);
    const D = new Coordinate(7, 5);

    expect(main.touches(A)).toBe(true);
    expect(main.touches(B)).toBe(true);
    expect(main.touches(C)).toBe(false);
    expect(main.touches(D)).toBe(false);
  });

  it('Correctly evaluates if coordinates are touching vertically', () => {
    const main = new Coordinate(5, 5);

    const A = new Coordinate(5, 4);
    const B = new Coordinate(5, 6);
    const C = new Coordinate(5, 3);
    const D = new Coordinate(5, 7);

    expect(main.touches(A)).toBe(true);
    expect(main.touches(B)).toBe(true);
    expect(main.touches(C)).toBe(false);
    expect(main.touches(D)).toBe(false);
  });

  it('Correctly evaluates if coordinates are touching diagonally', () => {
    const main = new Coordinate(5, 5);

    const A = new Coordinate(4, 4);
    const B = new Coordinate(4, 6);
    const C = new Coordinate(6, 4);
    const D = new Coordinate(6, 6);
    const E = new Coordinate(3, 3);
    const F = new Coordinate(7, 3);
    const G = new Coordinate(3, 7);
    const H = new Coordinate(7, 7);

    expect(main.touches(A)).toBe(true);
    expect(main.touches(B)).toBe(true);
    expect(main.touches(C)).toBe(true);
    expect(main.touches(D)).toBe(true);
    expect(main.touches(E)).toBe(false);
    expect(main.touches(F)).toBe(false);
    expect(main.touches(G)).toBe(false);
    expect(main.touches(H)).toBe(false);
  });

  it('Returns false if coordinates are not touching some random coordinates', () => {
    const main = new Coordinate(5, 5);

    const A = new Coordinate(3, 3);
    const B = new Coordinate(2, 6);
    const C = new Coordinate(0, 10);
    const D = new Coordinate(7, 5);

    expect(main.touches(A)).toBe(false);
    expect(main.touches(B)).toBe(false);
    expect(main.touches(C)).toBe(false);
    expect(main.touches(D)).toBe(false);
  });
});

describe('Move', () => {
  const main = new Knot(1);

  beforeEach(() => {
    main.position.x = 5;
    main.position.y = 5;
  });

  it('Should correctly move one up', () => {
    main.move('up');
    expect(main.position).toEqual(new Coordinate(5, 6));
  });

  it('Should correctly move one down', () => {
    main.move('down');
    expect(main.position).toEqual(new Coordinate(5, 4));
  });

  it('Should correctly move one left', () => {
    main.move('left');
    expect(main.position).toEqual(new Coordinate(4, 5));
  });

  it('Should correctly move one right', () => {
    main.move('right');
    expect(main.position).toEqual(new Coordinate(6, 5));
  });
});

describe('Move towards', () => {
  it('Should move towards the target horisontally to the right', () => {
    const tail = new Knot(1); // starts at (0,0)
    const head = new Knot(1);
    head.position.x = 2;
    head.position.y = 0;

    tail.follow(head);

    expect(tail.position).toEqual(new Coordinate(1, 0));
  });

  it('Should move to the left towards the target', () => {
    const tail = new Knot(1);
    const head = new Knot(1);
    head.position.x = -2;
    head.position.y = 0;
    tail.follow(head);

    expect(tail.position).toEqual(new Coordinate(-1, 0));
  });

  it('Should move diagonally towards the target', () => {
    const tail = new Knot(1);
    const head = new Knot(1);
    head.position.x = 1;
    head.position.y = 2;
    tail.follow(head);

    expect(tail.position).toEqual(new Coordinate(1, 1));
  });
});
