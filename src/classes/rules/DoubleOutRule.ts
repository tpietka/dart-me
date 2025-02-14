import { IDartThrow } from "../DartThrow";
import { IOutRule } from "../IOutRule";
import { Points } from "../valueObjects/Points";
import { RuleMessages } from "./RuleMessages";

export class DoubleOutRule implements IOutRule {
  private _minimalPointsLeftToWin: Points = Points.create(2);
  private _message: string = RuleMessages.none;
  getMessage(): string {
    return this._message;
  }
  public static create(): DoubleOutRule {
    return new DoubleOutRule();
  }

  public pass(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    this._message = RuleMessages.gameWon;
    if (this.hasWon(dartThrow, pointsLeft)) {
      return true;
    }
    return false;
  }
  public isBust(pointsLeft: Points) {
    this._message = RuleMessages.bust;
    return pointsLeft.isLowerThan(this._minimalPointsLeftToWin);
  }
  private hasWon(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return pointsLeft.isZero() && dartThrow.isDouble();
  }
}
