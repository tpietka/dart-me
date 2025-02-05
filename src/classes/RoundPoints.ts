import { DartThrow, IDartThrow } from "./DartThrow";
import { Points } from "./ValueObjects/Points";
import { RoundNumber } from "./ValueObjects/RoundNumber";

export class RoundPoints {
  private _throws: IDartThrow[] = [];
  private _startingPoints: Points;
  private _pointsLeft: Points = Points.zero;
  private _pointsScored: Points = Points.zero;
  private _roundNumber: RoundNumber;
  private readonly minimalRemainingPointsToWin = Points.create(2);

  constructor(startingPoints: Points, roundNumber: RoundNumber) {
    this._startingPoints = startingPoints;
    this._pointsLeft = startingPoints;
    this._roundNumber = roundNumber;
  }

  get throwsCount(): number {
    return this._throws.length;
  }

  get pointsLeft(): Points {
    return this._pointsLeft;
  }

  get throwNumber(): number {
    return this._throws.length + 1;
  }

  get pointsScored(): Points {
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
    this._pointsLeft = this._pointsLeft.subtract(dartThrow.getScore());
    if (this.isBust()) {
      this.resetPoints();
      this.nullifyRemainingThrows();
      return;
    }
    this.calculatePointsScored();
  }
  public hasWon(): boolean {
    return this._pointsLeft.isZero() && this.wasLastThrowDouble();
  }
  private isBust(): boolean {
    return (
      !this.hasWon() &&
      this._pointsLeft.isLowerThan(this.minimalRemainingPointsToWin)
    );
  }
  private resetPoints(): void {
    this._pointsLeft = this._startingPoints;
    this._pointsScored = Points.zero;
  }
  private calculatePointsScored(): void {
    let throwsSum = Points.zero;
    this._throws.forEach((dartThrow) => {
      throwsSum = throwsSum.add(dartThrow.getScore());
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
  constructor(startingPoints: Points) {
    super(startingPoints, RoundNumber.zero);
  }
  get hasCompletedRound(): boolean {
    return true;
  }
  public addThrow(): void {}
  public hasWon(): boolean {
    return false;
  }
}
