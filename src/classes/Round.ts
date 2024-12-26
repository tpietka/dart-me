import { DartThrow } from "./DartThrow";

export class Round {
  startingPoints: number;
  throws: DartThrow[] = [];
  pointsLeft: number = 0;
  roundNumber: number;

  constructor(startingPoints: number, roundNumber: number) {
    this.startingPoints = startingPoints;
    this.roundNumber = roundNumber;
  }
  setThrow(throwNumber: number, score: number) {
    this.throws.push(new DartThrow(score, throwNumber));
  }
  setMultiplier(throwNumber: number, multiplier: number) {
    this.throws
      .find((x) => x.throwNumber === throwNumber)
      ?.setMultiplier(multiplier);
  }
}
