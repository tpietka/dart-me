export class DartThrow {
  throwNumber: number;
  points: number = 0;
  multiplier: number = 1;

  constructor(throwNumber: number) {
    this.throwNumber = throwNumber;
  }
  setPoints(points: number) {
    this.points = points;
  }
  setMultiplier(multiplier: number) {
    this.multiplier = multiplier;
  }

  getScore() {
    return this.points * this.multiplier;
  }
}
