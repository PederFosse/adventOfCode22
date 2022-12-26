export class File {
  filename: string;
  size: number;

  constructor(filename: string, size: number) {
    this.filename = filename;
    this.size = size;
  }
}
