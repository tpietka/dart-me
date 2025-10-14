import { IDartThrow } from "../DartThrow";
import { IOutRule } from "../IOutRule";
import { Points } from "../valueObjects/Points";
import { RuleMessages } from "./RuleMessages";

export class DoubleOutRule implements IOutRule {
  private _minimalPointsLeftToWin: Points = Points.create(2);
  private _message: RuleMessages = RuleMessages.none;
  getMessage(): RuleMessages {
    return this._message;
  }
  public static create(): DoubleOutRule {
    return new DoubleOutRule();
  }

  public pass(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    this._message = RuleMessages.none;
    if (this.hasWon(dartThrow, pointsLeft)) {
      this._message = RuleMessages.gameWon;
      return true;
    }
    return false;
  }
  public isBust(pointsLeft: Points, dartThrow: IDartThrow) {
    this._message = RuleMessages.bust;
    if (pointsLeft.isZero() && !dartThrow.isDouble()) {
      this._message = RuleMessages.doubleOutFail;
    }
    return pointsLeft.isLowerThan(this._minimalPointsLeftToWin);
  }
  public isValidFinish(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    this._message = RuleMessages.none;
    return this.hasWon(dartThrow, pointsLeft);
  }
  private hasWon(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return pointsLeft.isZero() && dartThrow.isDouble();
  }
}
