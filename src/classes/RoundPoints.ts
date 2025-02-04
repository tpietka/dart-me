import { DartThrow, IDartThrow } from "./DartThrow";
import { IPlayer } from "./Player";

export class RoundPoints {
  private _startingPoints: number;
  private _throws: IDartThrow[] = [];
  private _pointsLeft: number = 0;
  private _pointsScored: number = 0;
  private _player: IPlayer;

  constructor(startingPoints: number, player: IPlayer) {
    this._startingPoints = startingPoints;
    this._pointsLeft = startingPoints;
    this._player = player;
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

  addThrow(dartThrow: IDartThrow): void {
    this._throws.push(dartThrow);
    this._pointsLeft -= dartThrow.getScore();
    if (this.isBust()) {
      this.resetPoints();
      this.nullifyRemainingThrows();
      return;
    }
    this.calculatePointsScored();
  }
  private isBust(): boolean {
    return !this.isWinningThrow() && this._pointsLeft < 2;
  }
  private isWinningThrow(): boolean {
    return this._pointsLeft === 0 && this.wasLastThrowDouble();
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
    return this._throws[this._throws.length - 1].isDouble();
  }
  private nullifyRemainingThrows(): void {
    while (this._throws.length < 3) {
      this._throws.push(DartThrow.empty());
    }
  }
}
