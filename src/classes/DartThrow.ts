export interface IDartThrow {
  points: number;
  multiplier: number;
  setPoints(points: number): void;
  setMultiplier(multiplier: number): void;
  getScore(): number;
  isDouble(): boolean;
}

export class DartThrow implements IDartThrow {
  public points: number = 0;
  public multiplier: number = 1;

  setPoints(points: number): void {
    this.points = points;
    if (this.isSingleThrow()) {
      this.setMultiplier(1);
    }
  }
  setMultiplier(multiplier: number): void {
    if (this.isSingleThrow()) {
      this.multiplier = 1;
      return;
    }
    this.multiplier = multiplier;
  }
  getScore(): number {
    return this.points * this.multiplier;
  }
  isDouble(): boolean {
    return this.multiplier === 2;
  }
  isSingleThrow(): boolean {
    return this.points === 25 || this.points === 50;
  }
}
