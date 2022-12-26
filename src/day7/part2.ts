import { getFileContents } from '../file-utils';
import { Filesystem } from './filesystem/filestystem';

export function day7part2() {
  const input = getFileContents(__dirname, 'input.txt').split('\n');
  const filesystem = new Filesystem();

  input.forEach((line) => {
    filesystem.execute(line);
  });

  const dirSizes = filesystem.getDirectorySizes();
  const totalDiskSize = 70_000_000;
  const spaceNeeded = 30_000_000;

  const availableSpace = totalDiskSize - filesystem.topDir.getTotalFileSize();

  const correct = dirSizes.reduce(
    (prev, curr) => {
      const availableSpaceIfDeleted = availableSpace + curr.size;
      return availableSpaceIfDeleted > spaceNeeded && curr.size < prev.size ? curr : prev;
    },
    { dirname: filesystem.topDir.getDirName(), size: filesystem.topDir.getTotalFileSize() }
  );

  console.log(correct);
}
