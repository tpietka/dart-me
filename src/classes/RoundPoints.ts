import { DartThrow, IDartThrow } from "./DartThrow";
import { RoundNumber } from "./ValueObjects/RoundNumber";

export class RoundPoints {
  private _startingPoints: number;
  private _throws: IDartThrow[] = [];
  private _pointsLeft: number = 0;
  private _pointsScored: number = 0;
  private _roundNumber: RoundNumber;

  constructor(startingPoints: number, roundNumber: RoundNumber) {
    this._startingPoints = startingPoints;
    this._pointsLeft = startingPoints;
    this._roundNumber = roundNumber;
  }

  get throwsCount(): number {
    return this._throws.length;
  }

  get pointsLeft(): number {
    return this._pointsLeft;
  }

  get pointsScored(): number {
    return this._pointsScored;
  }

  get hasCompletedRound(): boolean {
    return this._throws.length === 3;
  }

  get roundNumber(): RoundNumber {
    return this._roundNumber;
  }

  public addThrow(dartThrow: IDartThrow): void {
    this._throws.push(dartThrow);
    this._pointsLeft -= dartThrow.getScore();
    if (this.isBust()) {
      this.resetPoints();
      this.nullifyRemainingThrows();
      return;
    }
    this.calculatePointsScored();
  }
  public hasWon(): boolean {
    return this._pointsLeft === 0 && this.wasLastThrowDouble();
  }
  private isBust(): boolean {
    return !this.hasWon() && this._pointsLeft < 2;
  }
  private resetPoints(): void {
    this._pointsLeft = this._startingPoints;
    this._pointsScored = 0;
  }
  private calculatePointsScored(): void {
    let throwsSum = 0;
    this._throws.forEach((dartThrow) => {
      throwsSum += dartThrow.getScore();
    });
    this._pointsScored = throwsSum;
  }
  private wasLastThrowDouble(): boolean {
    if (this._throws.length === 0) {
      return false;
    }
    return this._throws[this._throws.length - 1].isDouble();
  }
  private nullifyRemainingThrows(): void {
    while (this._throws.length < 3) {
      this._throws.push(DartThrow.empty());
    }
  }
}

export class NullRoundPoints extends RoundPoints {
  constructor(startingPoints: number) {
    super(startingPoints, RoundNumber.zero);
  }
  get hasCompletedRound(): boolean {
    return true;
  }
  public addThrow(dartThrow: DartThrow): void {}
  public hasWon(): boolean {
    return false;
  }
}
