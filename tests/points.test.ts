import { Points } from "../src/classes/ValueObjects/Points";

describe("test RoundNumber class", () => {
  it("should create a points object and return correct value", () => {
    let points = Points.create(20);

    expect(points.value).toBe(20);
  });

  it("should return correct value after adding points", () => {
    let points = Points.create(20);
    points = points.add(13);

    expect(points.value).toBe(33);
  });

  it("should return correct value after substracting points", () => {
    let points = Points.create(20);
    points = points.subtract(13);

    expect(points.value).toBe(7);
  });

  it("should create new object from points object", () => {
    const points = Points.create(20);
    const newPoints = Points.fromPoints(points);

    expect(newPoints.value).toBe(20);
  });

  it("should return true when two objects have same value", () => {
    const points = Points.create(20);

    expect(Points.create(20).equals(points)).toBeTruthy();
  });

  it("should return false when two objects have different value", () => {
    let points = Points.create(20);

    expect(Points.create(25).equals(points)).toBeFalsy();
  });
});
