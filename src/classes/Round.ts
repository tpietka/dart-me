import { DartThrow } from "./DartThrow";

export class Round {
  startingPoints: number;
  throws: DartThrow[] = [];
  pointsLeft: number = 0;
  roundNumber: number;
  pointsScored: number = 0;

  constructor(startingPoints: number, roundNumber: number) {
    this.startingPoints = startingPoints;
    this.pointsLeft = startingPoints;
    this.roundNumber = roundNumber;
  }
  setThrow(dartThrow: DartThrow) {
    this.throws.push(dartThrow);
    this.pointsLeft = this.calculatePointsLeft();
    if (this.pointsLeft === 0) {
      if (!this.wasLastThrowDouble()) {
        this.pointsLeft = this.startingPoints;
        return;
      }
    }
  }
  calculatePointsLeft() {
    let throwsSum = 0;
    this.throws.forEach((dartThrow) => {
      throwsSum += dartThrow.getScore();
    });
    this.pointsScored = throwsSum;
    const pointsLeft = this.startingPoints - throwsSum;
    if (pointsLeft < 0) {
      return 0;
    }
    return pointsLeft;
  }
  wasLastThrowDouble() {
    return this.throws[this.throws.length - 1].isDouble();
  }
}
