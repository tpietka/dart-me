import { DartThrow } from "../src/classes/DartThrow";
import { Player } from "../src/classes/Player";
import { RoundPoints } from "../src/classes/RoundPoints";
import { DefaultInRule } from "../src/classes/rules/DefaultInRule";
import { DoubleInRule } from "../src/classes/rules/DoubleInRule";
import { DoubleOutRule } from "../src/classes/rules/DoubleOutRule";
import { Points } from "../src/classes/valueObjects/Points";
import { RoundNumber } from "../src/classes/valueObjects/RoundNumber";

const roundNumber = RoundNumber.create();

describe("test RoundPoints class", () => {
  let inRule = DefaultInRule.create();
  let outRule = DoubleOutRule.create();
  it("should have throws count greater equal to 1 after adding throw", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(500),
      roundNumber,
      inRule,
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));

    //Assert
    expect(roundPoints.throwsCount).toBe(1);
  });

  it("should finish round and reset points if throw is bust", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(5),
      roundNumber,
      inRule,
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(10, 1));

    //Assert
    expect(roundPoints.throwsCount).toBe(3);
    expect(roundPoints.pointsLeft.value).toBe(5);
  });

  it("should show correct score after two throws", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(100),
      roundNumber,
      inRule,
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));
    roundPoints.addThrow(new DartThrow(6, 2));

    //Assert
    expect(roundPoints.pointsScored.value).toBe(32);
    expect(roundPoints.pointsLeft.value).toBe(68);
  });

  it("should show there is throw left after two throws", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(100),
      roundNumber,
      inRule,
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));
    roundPoints.addThrow(new DartThrow(6, 2));

    //Assert
    expect(roundPoints.hasCompletedRound).toBe(false);
  });

  it("should show there is no throw left after three throws", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(100),
      roundNumber,
      inRule,
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));
    roundPoints.addThrow(new DartThrow(6, 2));
    roundPoints.addThrow(new DartThrow(2, 2));

    //Assert
    expect(roundPoints.hasCompletedRound).toBe(true);
  });

  it("should show that player has not won when have remaining points to score", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(200),
      roundNumber,
      inRule,
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(20, 3));
    roundPoints.addThrow(new DartThrow(10, 1));
    roundPoints.addThrow(new DartThrow(20, 2));

    //Assert
    expect(roundPoints.hasWon).toBe(false);
  });

  it("should show that player has won when last throw was double", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(100),
      roundNumber,
      inRule,
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(20, 3));
    roundPoints.addThrow(new DartThrow(20, 2));

    //Assert
    expect(roundPoints.hasWon).toBe(true);
  });

  it("should show that player has not won when last throw was not double", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(100),
      roundNumber,
      inRule,
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(20, 2));
    roundPoints.addThrow(new DartThrow(20, 3));

    //Assert
    expect(roundPoints.hasWon).toBe(false);
  });

  it("should start with double-in rule and nullify throws if hit not double segment", () => {
    //Arrange
    const roundPoints = new RoundPoints(
      Points.create(100),
      roundNumber,
      DoubleInRule.create(),
      outRule
    );

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));

    //Assert
    expect(roundPoints.pointsScored.value).toBe(0);
    expect(roundPoints.throwsCount).toBe(3);
  });
});
