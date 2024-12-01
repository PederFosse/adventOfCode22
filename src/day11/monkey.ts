export class Monkey {
  index: number;
  items: number[] = [];
  testDivisor: number;
  ifTrue: number;
  ifFalse: number;
  operation: (val: number) => number;
  inspectionCount = 0;

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
    this.testDivisor = Number(splitLine[splitLine.length - 1]);

    // extract true and false responses
    const trueResponseLine = input[4].split(' ');
    const falseResponseLine = input[5].split(' ');

    this.ifTrue = Number(trueResponseLine[trueResponseLine.length - 1]);
    this.ifFalse = Number(falseResponseLine[falseResponseLine.length - 1]);
  }

  clearItems() {
    this.items.splice(0, this.items.length);
  }

  throwTo(item: number) {
    this.items.push(item);
  }
}
