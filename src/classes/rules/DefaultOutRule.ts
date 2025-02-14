import { IDartThrow } from "../DartThrow";
import { IOutRule } from "../IOutRule";
import { Points } from "../valueObjects/Points";
import { RuleMessages } from "./RuleMessages";

export class DefaultOutRule implements IOutRule {
  private _minimalPointsLeftToWin: Points = Points.create(1);
  private _message: string = RuleMessages.none;
  getMessage(): string {
    return this._message;
  }
  public static create(): DefaultOutRule {
    return new DefaultOutRule();
  }

  public pass(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    this._message = RuleMessages.gameWon;
    return this.hasWon(dartThrow, pointsLeft);
  }
  public isBust(pointsLeft: Points) {
    this._message = RuleMessages.bust;
    return pointsLeft.isLowerThan(this._minimalPointsLeftToWin);
  }
  private hasWon(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return pointsLeft.isZero() && dartThrow.getScore() > 0;
  }
}
