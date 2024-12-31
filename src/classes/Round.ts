import { IDartThrow } from "./DartThrow";

export interface IRound {
  setThrow(dartThrow: IDartThrow): void;
  getPointsLeft(): number;
  isRoundCompleted(): boolean;
  getRoundNumber(): number;
  getScoredPoints(): number;
}

export class Round implements IRound {
  private startingPoints: number;
  private throws: IDartThrow[] = [];
  private pointsLeft: number = 0;
  private roundNumber: number;
  private pointsScored: number = 0;

  constructor(startingPoints: number, roundNumber: number) {
    this.startingPoints = startingPoints;
    this.pointsLeft = startingPoints;
    this.roundNumber = roundNumber;
  }
  public setThrow(dartThrow: IDartThrow): void {
    this.throws.push(dartThrow);
    this.pointsLeft = this.calculatePointsLeft();
    if (this.pointsLeft === 0) {
      if (!this.wasLastThrowDouble()) {
        this.pointsLeft = this.startingPoints;
        return;
      }
    }
  }
  public getPointsLeft(): number {
    return this.pointsLeft;
  }
  public getScoredPoints(): number {
    return this.pointsScored;
  }
  public isRoundCompleted(): boolean {
    return this.throws.length === 3;
  }
  public getRoundNumber(): number {
    return this.roundNumber;
  }
  private calculatePointsLeft(): number {
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
  private wasLastThrowDouble(): boolean {
    return this.throws[this.throws.length - 1].isDouble();
  }
}
