import { Points } from "./ValueObjects/Points";

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
  private _multiplier: number = 1;

  public constructor(points: number, multiplier: number) {
    //TODO: Add validation for points
    this._points = Points.create(points);
    this._multiplier = multiplier;
  }

  public static empty(): DartThrow {
    return new DartThrow(0, 1);
  }

  public get points(): number {
    return this._points.value;
  }
  public get multiplier(): number {
    return this._multiplier;
  }

  public setPoints(points: number): void {
    this._points = Points.create(points);
    if (this.isSingleThrow()) {
      this.setMultiplier(1);
    }
  }
  public setMultiplier(multiplier: number): void {
    if (this.isSingleThrow()) {
      this._multiplier = 1;
      return;
    }
    this._multiplier = multiplier;
  }
  public getScore(): number {
    return this._points.value * this._multiplier;
  }
  public isDouble(): boolean {
    return this._multiplier === 2;
  }
  private isSingleThrow(): boolean {
    return this._points.value === 25 || this._points.value === 50;
  }
}
