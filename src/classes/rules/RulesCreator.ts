import { GameTypes } from "../GameType";
import { IInRule } from "../IInRule";
import { IOutRule } from "../IOutRule";
import { DefaultInRule } from "./DefaultInRule";
import { DefaultOutRule } from "./DefaultOutRule";
import { DoubleInRule } from "./DoubleInRule";
import { DoubleOutRule } from "./DoubleOutRule";

export class RulesCreator {
  private _doesRulesApply: boolean = true;
  private _inRule: IInRule;
  private _outRule: IOutRule;
  constructor(gameType: GameTypes, doubleIn: boolean, doubleOut: boolean) {
    if (gameType === "Practice") {
      this._doesRulesApply = false;
    }
    this._inRule = doubleIn ? new DoubleInRule() : new DefaultInRule();
    this._outRule = doubleOut ? new DoubleOutRule() : new DefaultOutRule();
  }
  public shouldApplyRules(): boolean {
    return this._doesRulesApply;
  }
  public getInRule(): IInRule {
    return this._inRule;
  }
  public getOutRule(): IOutRule {
    return this._outRule;
  }
}
