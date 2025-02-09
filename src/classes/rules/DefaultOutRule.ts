import { IDartThrow } from "../DartThrow";
import { IOutRule } from "../IOutRule";
import { Points } from "../valueObjects/Points";

export class DefaultOutRule implements IOutRule {
  private _minimalPointsLeftToWin: Points = Points.create(1);

  public static create(): DefaultOutRule {
    return new DefaultOutRule();
  }

  public pass(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return this.hasWon(dartThrow, pointsLeft);
  }
  public isBust(pointsLeft: Points) {
    return pointsLeft.isLowerThan(this._minimalPointsLeftToWin);
  }
  private hasWon(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return pointsLeft.isZero();
  }
}
