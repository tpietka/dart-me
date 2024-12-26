export class DartThrow {
  throwNumber: number;
  score: number;
  multiplier: number = 1;

  constructor(score: number, throwNumber: number) {
    this.score = score;
    this.throwNumber = throwNumber;
  }

  setMultiplier(multiplier: number) {
    this.multiplier = multiplier;
  }

  getScore() {
    return this.score * this.multiplier;
  }
}
