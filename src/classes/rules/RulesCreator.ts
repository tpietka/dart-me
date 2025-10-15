import { GameTypes } from "../GameType";
import { IInRule } from "../IInRule";
import { IOutRule } from "../IOutRule";
import { IThrowAdviser } from "../IThrowAdviser";
import { DefaultInRule } from "./DefaultInRule";
import { DefaultOutRule } from "./DefaultOutRule";
import { DisabledThrowAdviser } from "./DisabledThrowAdviser";
import { DoubleInRule } from "./DoubleInRule";
import { DoubleOutRule } from "./DoubleOutRule";
import { NextThrowAdviser } from "./NextThrowAdviser";

export class RulesCreator {
  private _gameType: GameTypes;
  private _inRule: IInRule;
  private _outRule: IOutRule;
  private _dartThrowAdviser: IThrowAdviser;
  constructor(gameType: GameTypes, doubleIn: boolean, doubleOut: boolean, shoudSuggestThrows: boolean) {
    this._gameType = gameType;
    this._inRule = this.setInRule(doubleIn);
    this._outRule = this.setOutRule(doubleOut);
    this._dartThrowAdviser = this.setThrowAdviser(shoudSuggestThrows);
  }
  public getInRule(): IInRule {
    return this._inRule;
  }
  public getOutRule(): IOutRule {
    return this._outRule;
  }
  public getThrowAdviser(): IThrowAdviser {
    return this._dartThrowAdviser;
  }
  public setThrowAdviser(shoudSuggestThrows: boolean): IThrowAdviser {
    return shoudSuggestThrows ? new NextThrowAdviser(this._outRule) : new DisabledThrowAdviser();
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
