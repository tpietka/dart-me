import { IDartThrow } from "../DartThrow";
import { IOutRule } from "../IOutRule";
import { Points } from "../valueObjects/Points";

export class DefaultOutRule implements IOutRule {
  public static create(): DefaultOutRule {
    return new DefaultOutRule();
  }

  public get minimalPointsLeftToWin(): Points {
    return Points.create(1);
  }
  public pass(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return this.hasWon(dartThrow, pointsLeft);
  }

  private hasWon(dartThrow: IDartThrow, pointsLeft: Points): boolean {
    return pointsLeft.isZero();
  }
}
