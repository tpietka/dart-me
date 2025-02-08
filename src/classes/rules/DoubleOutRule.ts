import { IDartThrow } from "../DartThrow";
import { IOutRule } from "../IOutRule";
import { Points } from "../valueObjects/Points";

export class DoubleOutRule implements IOutRule {
  public get minimalPointsLeftToWin(): Points {
    return Points.create(2);
  }

  public pass(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    if (this.hasWon(dartThrow, pointsLeft)) {
      return true;
    }
    return false;
  }
  public hasWon(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return pointsLeft.isZero() && dartThrow.isDouble();
  }
}
