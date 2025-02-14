import { GameTypes } from "../GameType";
import { IInRule } from "../IInRule";
import { IOutRule } from "../IOutRule";
import { DefaultInRule } from "./DefaultInRule";
import { DefaultOutRule } from "./DefaultOutRule";
import { DoubleInRule } from "./DoubleInRule";
import { DoubleOutRule } from "./DoubleOutRule";

export class RulesCreator {
  private _gameType: GameTypes;
  private _inRule: IInRule;
  private _outRule: IOutRule;
  constructor(gameType: GameTypes, doubleIn: boolean, doubleOut: boolean) {
    this._gameType = gameType;
    this._inRule = this.setInRule(doubleIn);
    this._outRule = this.setOutRule(doubleOut);
  }
  public getInRule(): IInRule {
    return this._inRule;
  }
  public getOutRule(): IOutRule {
    return this._outRule;
  }
  private isPractice(): boolean {
    return this._gameType === "Practice";
  }
  private setInRule(doubleIn: boolean): IInRule {
    if (doubleIn && !this.isPractice()) {
      return new DoubleInRule();
    }
    return new DefaultInRule();
  }
  private setOutRule(doubleOut: boolean): IOutRule {
    if (doubleOut && !this.isPractice()) {
      return new DoubleOutRule();
    }
    return new DefaultOutRule();
  }
}
