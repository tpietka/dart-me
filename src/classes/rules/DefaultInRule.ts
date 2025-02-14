import { IInRule } from "../IInRule";
import { RuleMessages } from "./RuleMessages";

export class DefaultInRule implements IInRule {
  private _message: string = RuleMessages.none;
  getMessage(): string {
    return this._message;
  }
  public static create(): DefaultInRule {
    return new DefaultInRule();
  }

  public pass(): boolean {
    return true;
  }
}
