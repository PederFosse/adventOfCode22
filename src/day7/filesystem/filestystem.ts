import { Directory } from './directory';

export class Filesystem {
  topDir: Directory;
  currentDir: Directory;

  constructor() {
    this.topDir = new Directory('/');
    this.currentDir = this.topDir;
    
  }

  getDirectorySizes() {
    const directorySizes: { dirname: string; size: number }[] = [];
    this.topDir.getDirectorySizes(directorySizes);
    return directorySizes;
  }

  execute(command: string) {
    const data = command.split(' ');
    if (data[0] === '$') {
      if (data[1] === 'cd') {
        if (data[2] === '..') {
          this.currentDir = this.currentDir.parent();
        } else if (data[2] === '/') {
          this.currentDir = this.topDir;
        } else {
          this.currentDir = this.currentDir.cd(data[2]);
        }
      }
    } else if (data[0] === 'dir') {
      this.currentDir.createDir(data[1]);
    } else {
      this.currentDir.addFile(data[1], Number(data[0]));
    }
  }
}
