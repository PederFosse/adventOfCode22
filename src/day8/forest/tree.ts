export class Tree {
  private height: number;
  private visibleFromOutside: boolean;
  totalScore: number = 1;

  constructor(height: number) {
    this.height = height;
  }

  isVisible(): boolean {
    return this.visibleFromOutside;
  }

  setVisible(): void {
    //console.log(`Tree with height: ${this.height} is visible`);
    this.visibleFromOutside = true;
  }

  getHeight(): number {
    return this.height;
  }
}