export interface IDartThrow {
  points: number;
  multiplier: number;
  setPoints(points: number): void;
  setMultiplier(multiplier: number): void;
  getScore(): number;
  isDouble(): boolean;
}

export class DartThrow implements IDartThrow {
  private throwNumber: number;
  public points: number = 0;
  public multiplier: number = 1;

  constructor(throwNumber: number) {
    this.throwNumber = throwNumber;
  }
  setPoints(points: number): void {
    this.points = points;
  }
  setMultiplier(multiplier: number): void {
    this.multiplier = multiplier;
  }
  getScore(): number {
    return this.points * this.multiplier;
  }
  isDouble(): boolean {
    return this.multiplier === 2;
  }
}
