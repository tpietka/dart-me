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
  setThrow(dartThrow: DartThrow) {
    this.throws.push(dartThrow);
  }
}
