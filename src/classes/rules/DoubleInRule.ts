import { IDartThrow } from "../DartThrow";
import { IInRule } from "../IInRule";

export class DoubleInRule implements IInRule {
  public static create(): DoubleInRule {
    return new DoubleInRule();
  }

  public pass(dartThrow: IDartThrow): boolean {
    return (
      this.isThrowADouble(dartThrow) && this.isThrowScoreNotZero(dartThrow)
    );
  }

  private isThrowADouble(dartThrow: IDartThrow): boolean {
    return dartThrow.isDouble();
  }

  private isThrowScoreNotZero(dartThrow: IDartThrow) {
    return dartThrow.getScore() > 0;
  }
}
