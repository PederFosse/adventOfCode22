export class CPU {
  cycle: number;
  registerX: number;
  currentRow: string;

  constructor() {
    this.registerX = 1;
    this.cycle = 0;
    this.currentRow = '';
  }

  write(value: string) {
    this.currentRow += value;
    if (this.currentRow.length === 40) {
      console.log(this.currentRow);
      this.currentRow = '';
    }
  }

  incrementCycle(times: number) {
    for (let i = 0; i < times; i++) {
      this.write(this.isSpriteVisible() ? '#' : ' ');
      this.cycle++;
    }
  }

  private isSpriteVisible() {
    const middleOfSprite = this.registerX % 40;
    const printPosition = this.cycle % 40;
    return [-1, 0, 1].includes(middleOfSprite - printPosition);
  }

  noop(): number {
    this.incrementCycle(1);
    return this.registerX;
  }

  addx(value: number): number {
    const oldX = this.registerX;

    this.incrementCycle(2);
    this.registerX += value;

    return oldX;
  }
}
