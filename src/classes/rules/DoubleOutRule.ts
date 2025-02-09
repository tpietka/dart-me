import { IDartThrow } from "../DartThrow";
import { IOutRule } from "../IOutRule";
import { Points } from "../valueObjects/Points";

export class DoubleOutRule implements IOutRule {
  private _minimalPointsLeftToWin: Points = Points.create(2);

  public static create(): DoubleOutRule {
    return new DoubleOutRule();
  }

  public pass(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    if (this.hasWon(dartThrow, pointsLeft)) {
      return true;
    }
    return false;
  }
  public isBust(pointsLeft: Points) {
    return pointsLeft.isLowerThan(this._minimalPointsLeftToWin);
  }
  private hasWon(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return pointsLeft.isZero() && dartThrow.isDouble();
  }
}
