import { DartThrow, IDartThrow } from "./DartThrow";
import { IOutRule } from "./IOutRule";
import { IInRule } from "./IInRule";
import { Points } from "./valueObjects/Points";
import { RoundNumber } from "./valueObjects/RoundNumber";
import { DefaultInRule } from "./rules/DefaultInRule";

export interface IRoundPoints {
  throwsCount: number;
  pointsLeft: Points;
  throwNumber: number;
  pointsScored: Points;
  hasCompletedRound: boolean;
  throwPoints: IDartThrow[];
  roundNumber: RoundNumber;
  addThrow(dartThrow: IDartThrow): void;
  hasWon(): boolean;
}

export class RoundPoints {
  private _inRule: IInRule;
  private _outRule: IOutRule;
  private _throws: IDartThrow[] = [];
  private _startingPoints: Points;
  private _pointsLeft: Points = Points.zero;
  private _pointsScored: Points = Points.zero;
  private _roundNumber: RoundNumber;
  private _hasWon: boolean = false;

  constructor(
    startingPoints: Points,
    roundNumber: RoundNumber,
    inRule: IInRule,
    outRule: IOutRule
  ) {
    this._startingPoints = startingPoints;
    this._pointsLeft = startingPoints;
    this._roundNumber = roundNumber;
    this._inRule = inRule;
    this._outRule = outRule;
  }

  get hasWon(): boolean {
    return this._hasWon;
  }
  get throwsCount(): number {
    return this._throws.length;
  }

  get inRule(): IInRule {
    return this._inRule;
  }

  get outRule(): IOutRule {
    return this._outRule;
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

  public get throwPoints() {
    return this._throws;
  }

  get roundNumber(): RoundNumber {
    return this._roundNumber;
  }

  public addThrow(dartThrow: IDartThrow): void {
    this._throws.push(dartThrow);
    this._pointsLeft = this._pointsLeft.subtract(dartThrow.getScore());
    if (!this._inRule.pass(dartThrow)) {
      this.resetPoints();
      this.nullifyRemainingThrows();
      return;
    }
    this._inRule = DefaultInRule.create();
    this._hasWon = this._outRule.pass(dartThrow, this._pointsLeft);
    if (!this._hasWon) {
      if (this.isBust()) {
        this.resetPoints();
        this.nullifyRemainingThrows();
        return;
      }
    }
    this.calculatePointsScored();
  }
  private isBust(): boolean {
    return this._outRule.isBust(this._pointsLeft);
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
  private nullifyRemainingThrows(): void {
    while (this._throws.length < 3) {
      this._throws.push(DartThrow.empty());
    }
  }
}

export class NullRoundPoints extends RoundPoints {
  constructor(startingPoints: Points, inRule: IInRule, outRule: IOutRule) {
    super(startingPoints, RoundNumber.zero, inRule, outRule);
  }
  get hasCompletedRound(): boolean {
    return true;
  }
  public addThrow(): void {}
  public get hasWon(): boolean {
    return false;
  }
}
