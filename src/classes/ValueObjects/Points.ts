export class Points {
  private _value: number;

  private constructor(value: number) {
    this._value = value;
  }

  public static create(value: number): Points {
    return new Points(value);
  }

  public static fromPoints(value: Points): Points {
    return new Points(value.value);
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
