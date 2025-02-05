export class Points {
  private _value: number;

  private constructor(value: number) {
    this._value = value;
  }

  public static get zero(): Points {
    return new Points(0);
  }

  public static create(value: number): Points {
    return new Points(value);
  }

  public static fromPoints(value: Points): Points {
    return new Points(value.value);
  }

  public isLowerThan(value: Points): boolean {
    return this._value < value._value;
  }

  public isZero(): boolean {
    return this._value === 0;
  }

  public get value(): number {
    return this._value;
  }

  public subtract(value: number): Points {
    return Points.create(this._value - value);
  }

  public add(value: number): Points {
    return Points.create(this._value + value);
  }

  public equals(points: Points): boolean {
    return this._value === points.value;
  }
}
