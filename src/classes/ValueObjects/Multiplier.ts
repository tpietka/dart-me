export class Multiplier {
  private _value: number;
  public static single = Multiplier.create(1);
  public static double = Multiplier.create(2);
  public static triple = Multiplier.create(3);

  private constructor(value: number) {
    this._value = value;
  }

  public static get default(): Multiplier {
    return new Multiplier(1);
  }

  public static create(value: number): Multiplier {
    return new Multiplier(value);
  }

  public static fromMultiplier(value: Multiplier): Multiplier {
    return new Multiplier(value.value);
  }

  public equals(multiplier: Multiplier): boolean {
    return this._value === multiplier._value;
  }

  public isDifferentThanAvailable(): boolean {
    return !(this._value === 1 || this._value === 2 || this._value === 3);
  }

  public get value(): number {
    return this._value;
  }
}
