import { IDartThrow } from "../DartThrow";
import { IInRule } from "../IInRule";
import { RuleMessages } from "./RuleMessages";

export class DoubleInRule implements IInRule {
  private _message: string = RuleMessages.doubleInFail;
  getMessage(): string {
    return this._message;
  }
  public static create(): DoubleInRule {
    return new DoubleInRule();
  }
  public pass(dartThrow: IDartThrow): boolean {
    this._message = RuleMessages.none;
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
