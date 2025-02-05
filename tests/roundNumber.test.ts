import { RoundNumber } from "../src/classes/ValueObjects/RoundNumber";

describe("test RoundNumber class", () => {
  it("should create a default RoundNumber object with value 1", () => {
    const roundNumber = RoundNumber.create();

    expect(roundNumber.value).toBe(1);
  });

  it("should get value + 1 after calling next method", () => {
    const roundNumber = RoundNumber.create();

    expect(roundNumber.next().value).toBe(2);
  });

  it("should get value of 4 after calling next 3 times", () => {
    let roundNumber = RoundNumber.create();
    roundNumber = roundNumber.next().next().next();

    expect(roundNumber.value).toBe(4);
  });
});
