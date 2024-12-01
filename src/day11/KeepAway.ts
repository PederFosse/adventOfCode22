import { Monkey } from './monkey';

export class KeepAway {
  private allDivisors: number;
  constructor(private part: 1 | 2, private monkeys: Monkey[]) {
    this.allDivisors = monkeys.map((m) => m.testDivisor).reduce((prev, curr) => prev * curr, 1);
  }

  private playRound() {
    this.monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        monkey.inspectionCount++;

        let worryLevel = monkey.operation(item);

        if (this.part === 1) {
          worryLevel = Math.floor(worryLevel / 3);
        }

        worryLevel = worryLevel % this.allDivisors;
        const isDivisible: boolean = worryLevel % monkey.testDivisor === 0;

        if (isDivisible) {
          this.monkeys[monkey.ifTrue].throwTo(worryLevel);
        } else {
          this.monkeys[monkey.ifFalse].throwTo(worryLevel);
        }
      });
      monkey.clearItems();
    });
  }

  play() {
    if (this.part === 1) {
      for (let i = 0; i < 20; i++) {
        this.playRound();
      }
    } else {
      for (let i = 0; i < 10_000; i++) {
        this.playRound();
      }
    }

    return this.monkeys;
  }
}
