import { File } from './file';

export class Directory {
  private dirname: string;
  private files: File[];
  private childDirs: Directory[];
  private parentDir: Directory | undefined;
  private totalFileSize: number = 0;

  constructor(dirname: string, parent?: Directory) {
    this.dirname = dirname;
    this.parentDir = parent;
    this.files = [];
    this.childDirs = [];
  }

  getTotalFileSize(): number {
    return this.totalFileSize;
  }

  getDirName(): string {
    return this.dirname;
  }

  parent() {
    return this.parentDir;
  }

  cd(dirname: string) {
    const dir: Directory = this.childDirs.find((dir) => dir.dirname === dirname);

    if (!dir) {
      throw new Error(`Directory ${dirname} does not exist`);
    }

    return dir;
  }

  createDir(dirName: string) {
    const newDir = new Directory(dirName, this);
    this.childDirs.push(newDir);
  }

  updateFileSize(size: number) {
    this.totalFileSize += size;
    if (this.parent() !== undefined) {
      this.parent().updateFileSize(size);
    }
  }

  addFile(filename: string, filesize: number) {
    this.files.push(new File(filename, filesize));
    this.updateFileSize(filesize);
  }

  logSizes() {
    console.log(this.dirname, this.totalFileSize);
    this.childDirs.forEach((dir) => {
      dir.logSizes();
    });
  }

  getDirectorySizes(array: { dirname: string; size: number }[]): void {
    array.push({ dirname: this.dirname, size: this.totalFileSize });
    this.childDirs.forEach((dir) => dir.getDirectorySizes(array));
  }

  sumSizes(): number {
    if (this.childDirs.length === 0) {
      if (this.totalFileSize <= 100_000) {
        return this.totalFileSize;
      } else {
        return 0;
      }
    } else {
      const sizeToAdd = this.totalFileSize <= 100000 ? this.totalFileSize : 0;
      return (
        this.childDirs.reduce((prev, cur) => {
          return prev + cur.sumSizes();
        }, 0) + sizeToAdd
      );
    }
  }
}
