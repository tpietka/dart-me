export interface IDartThrow {
  setPoints(points: number): void;
  setMultiplier(multiplier: number): void;
  getScore(): number;
  isDouble(): boolean;
}

export class DartThrow implements IDartThrow {
  private throwNumber: number;
  private points: number = 0;
  private multiplier: number = 1;

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
