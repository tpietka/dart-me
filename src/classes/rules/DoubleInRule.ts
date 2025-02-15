import { IDartThrow } from "../DartThrow";
import { IInRule } from "../IInRule";
import { RuleMessages } from "./RuleMessages";

export class DoubleInRule implements IInRule {
  private _message: RuleMessages = RuleMessages.doubleInFail;
  getMessage(): RuleMessages {
    return this._message;
  }
  public static create(): DoubleInRule {
    return new DoubleInRule();
  }
  public pass(dartThrow: IDartThrow): boolean {
    this._message = RuleMessages.none;
    const rulePassed =
      this.isThrowADouble(dartThrow) && this.isThrowScoreNotZero(dartThrow);
    if (!rulePassed) {
      this._message = RuleMessages.doubleInFail;
    }
    return rulePassed;
  }

  private isThrowADouble(dartThrow: IDartThrow): boolean {
    return dartThrow.isDouble();
  }

  private isThrowScoreNotZero(dartThrow: IDartThrow) {
    return dartThrow.getScore() > 0;
  }
}
