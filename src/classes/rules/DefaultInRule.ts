import { IInRule } from "../IInRule";
import { RuleMessages } from "./RuleMessages";

export class DefaultInRule implements IInRule {
  private _message: RuleMessages = RuleMessages.none;
  getMessage(): RuleMessages {
    return this._message;
  }
  public static create(): DefaultInRule {
    return new DefaultInRule();
  }

  public pass(): boolean {
    return true;
  }
}
