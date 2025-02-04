import { DartThrow } from "../src/classes/DartThrow";

describe("test DartThrow class", () => {
  it("should create a new DartThrow object", () => {
    const dartThrow = new DartThrow(20, 1);
    expect(dartThrow).toBeTruthy();
    expect(dartThrow.points).toBe(20);
    expect(dartThrow.multiplier).toBe(1);
  });

  it("should set points", () => {
    const dartThrow = DartThrow.empty();
    dartThrow.setPoints(20);
    expect(dartThrow.points).toBe(20);
  });

  it("should set multiplier to 1 if points is greater than 20", () => {
    const dartThrow = DartThrow.empty();
    dartThrow.setMultiplier(3);
    dartThrow.setPoints(25);
    expect(dartThrow.getScore()).toBe(25);
    expect(dartThrow.multiplier).toBe(1);
  });

  it("should set multiplier", () => {
    const dartThrow = DartThrow.empty();
    dartThrow.setMultiplier(2);
    dartThrow.setPoints(19);
    expect(dartThrow.multiplier).toBe(2);
  });

  it("should get score", () => {
    const dartThrow = DartThrow.empty();
    dartThrow.setPoints(20);
    dartThrow.setMultiplier(2);
    expect(dartThrow.getScore()).toBe(40);
  });
});
