import { Multiplier } from "./valueObjects/Multiplier";
import { Points } from "./valueObjects/Points";

export interface IDartThrow {
  points: number;
  multiplier: number;
  setPoints(points: number): void;
  setMultiplier(multiplier: number): void;
  getScore(): number;
  isDouble(): boolean;
}

export class DartThrow implements IDartThrow {
  private _points: Points = Points.zero;
  private _multiplier: Multiplier = Multiplier.default;

  public constructor(points: number, multiplier: number) {
    this._points = Points.create(points);
    this._multiplier = Multiplier.create(multiplier);
  }

  public static empty(): DartThrow {
    return new DartThrow(0, 1);
  }

  public get points(): number {
    return this._points.value;
  }
  public get multiplier(): number {
    return this._multiplier.value;
  }

  public setPoints(points: number): void {
    this._points = Points.create(points);
    if (this.isPointsWithInvalidMultiplier()) {
      this.setMultiplier(1);
    }
  }
  public setMultiplier(multiplier: number): void {
    if (this.isPointsWithInvalidMultiplier()) {
      this._multiplier = Multiplier.default;
      return;
    }
    this._multiplier = Multiplier.create(multiplier);
  }
  public getScore(): number {
    return this._points.value * this._multiplier.value;
  }
  public isDouble(): boolean {
    return this._multiplier.equals(Multiplier.double);
  }
  private isPointsWithInvalidMultiplier(): boolean {
    return (
      (this._points.value === 25 &&
        this._multiplier.equals(Multiplier.triple)) ||
      (this._points.value === 0 && !this._multiplier.equals(Multiplier.single))
    );
  }
}
