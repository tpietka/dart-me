import { IDartThrow } from "./DartThrow";

export interface IRound {
  setThrow(dartThrow: IDartThrow): void;
  getPointsLeft(): number;
  isRoundCompleted(): boolean;
  getRoundNumber(): number;
  getScoredPoints(): number;
  getThrowsCount(): number;
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
    this.pointsLeft -= dartThrow.getScore();
    if (this.isBust()) {
      this.resetPoints();
      this.pointsScored = 0;
      return;
    }
    this.calculatePointsScored();
  }
  get throwNumber(): number {
    return this.throws.length + 1;
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
  public getThrowsCount(): number {
    return this.throws.length;
  }
  private isBust(): boolean {
    return !this.isWinningThrow() && this.pointsLeft < 2;
  }
  private isWinningThrow(): boolean {
    return this.pointsLeft === 0 && this.wasLastThrowDouble();
  }
  private resetPoints(): void {
    this.pointsLeft = this.startingPoints;
  }
  private calculatePointsScored(): void {
    let throwsSum = 0;
    this.throws.forEach((dartThrow) => {
      throwsSum += dartThrow.getScore();
    });
    this.pointsScored = throwsSum;
  }
  private wasLastThrowDouble(): boolean {
    return this.throws[this.throws.length - 1].isDouble();
  }
}
