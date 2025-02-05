export class RoundNumber {
  private _value: number;

  public static get zero(): RoundNumber {
    return new RoundNumber(0);
  }
  get value(): number {
    return this._value;
  }

  private constructor(value: number) {
    this._value = value;
  }

  public static create(): RoundNumber {
    return new RoundNumber(1);
  }

  public next(): RoundNumber {
    return new RoundNumber(this._value + 1);
  }

  public equals(roundNumber: RoundNumber): boolean {
    return this._value === roundNumber.value;
  }
}
