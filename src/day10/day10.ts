import { getFileContents } from '../file-utils';
import { CPU } from './cpu';

export function day10(filename: string) {
  const instructions = getFileContents(__dirname, filename).split('\n');

  // Include 240 in this array for part 2
  const signalStrengthCycles = [20, 60, 100, 140, 180, 220, 240];

  let currentCycleWaitingFor = 0; // index in this array ^

  const cpu = new CPU();

  let signalStrength = 0;

  for (let instruction of instructions) {
    let oldX: number;
    if (instruction === 'noop') {
      oldX = cpu.noop();
    } else {
      const addValue = Number(instruction.split(' ')[1]);
      oldX = cpu.addx(addValue);
    }

    if (cpu.cycle >= signalStrengthCycles[currentCycleWaitingFor]) {
      signalStrength += signalStrengthCycles[currentCycleWaitingFor] * oldX;
      if (++currentCycleWaitingFor === signalStrengthCycles.length) break;
    }
  }

  return {
    signalStrength,
    cpu,
  };
}
