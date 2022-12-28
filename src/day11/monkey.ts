export class Monkey {
  private index: number;
  private items: number[] = [];
  private divisibleByNumber: number;
  private testSuccessReceiver: number;
  private testFailReceiver: number;
  private operation: (val: number) => number;
  private inspectionCount = 0;

  constructor(input: string[]) {
    // set index
    this.index = Number(input[0].split(' ')[1].replace(':', ''));

    // extract starting items
    input[1]
      .split(':')[1]
      .replace(' ', '')
      .split(',')
      .forEach((item) => {
        this.items.push(Number(item));
      });

    // extract operation (either add or multiply a value)
    const operationLine = input[2].split('=')[1].split(' ');
    const operator = operationLine[2];
    let value = operationLine[3];

    if (operator === '*') {
      this.operation = (input) => input * Number(value === 'old' ? input : value);
    } else {
      this.operation = (input) => input + Number(value === 'old' ? input : value);
    }

    // extract divisibleNByNumber
    const splitLine = input[3].split(' ');
    this.divisibleByNumber = Number(splitLine[splitLine.length - 1]);

    // extract true and false responses
    const trueResponseLine = input[4].split(' ');
    const falseResponseLine = input[5].split(' ');

    this.testSuccessReceiver = Number(trueResponseLine[trueResponseLine.length - 1]);
    this.testFailReceiver = Number(falseResponseLine[falseResponseLine.length - 1]);
  }

  getInspectionCount(): number {
    return this.inspectionCount;
  }

  getItems(): number[] {
    return this.items;
  }

  printItems() {
    console.log(
      `Monkey ${this.index}${this.items.reduce((prev, curr) => {
        return `${prev} ${curr}`;
      }, ':')}`
    );
  }

  inspectItems(otherMonkeys: Monkey[]) {
    this.items.forEach((item) => {
      const [monkeyToThrowTo, newItem] = this.inspectOneItem(item);
      otherMonkeys[monkeyToThrowTo].addItem(newItem);
    });
    this.items = [];
  }

  inspectOneItem(item: number): [number, number] {
    this.inspectionCount++;
    let worryLevel = this.operation(item);
    // skip this step for part2
    worryLevel = Math.floor(worryLevel / 3);
    const isDivisible = worryLevel % this.divisibleByNumber === 0;
    return [isDivisible ? this.testSuccessReceiver : this.testFailReceiver, worryLevel];
  }

  addItem(item: number) {
    this.items.push(item);
  }
}
