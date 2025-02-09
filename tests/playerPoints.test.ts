import { DartThrow } from "../src/classes/DartThrow";
import { Player } from "../src/classes/Player";
import { PlayerPoints } from "../src/classes/PlayerPoints";
import { DefaultInRule } from "../src/classes/rules/DefaultInRule";
import { DoubleInRule } from "../src/classes/rules/DoubleInRule";
import { DoubleOutRule } from "../src/classes/rules/DoubleOutRule";
import { Points } from "../src/classes/valueObjects/Points";
import { RoundNumber } from "../src/classes/valueObjects/RoundNumber";

describe("test PlayerPointsManager class", () => {
  let inRule = DefaultInRule.create();
  let outRule = DoubleOutRule.create();
  it("should return last round", () => {
    const roundNumber = RoundNumber.create();
    //Arrange
    const playerPoints = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      inRule,
      outRule
    );

    //Act
    playerPoints.addRound(roundNumber);
    playerPoints.addThrow(new DartThrow(20, 1));
    playerPoints.addThrow(new DartThrow(20, 1));
    playerPoints.addThrow(new DartThrow(20, 1));
    playerPoints.addRound(roundNumber.getNext());
    //Assert
    expect(playerPoints.roundNumber.value).toBe(2);
  });

  it("should display correct remaining points to score after two rounds", () => {
    const roundNumber = RoundNumber.create();

    //Arrange
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      inRule,
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(pointsManager.scoredPoints.value).toBe(60);
  });

  it("should block creating new round if the previous one is not finished", () => {
    const roundNumber = RoundNumber.create();

    //Arrange
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      inRule,
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(() => pointsManager.addRound(roundNumber.getNext())).toThrow(
      "Previous round has not been completed"
    );
  });

  it("should throw expception if round with round number already exists", () => {
    const roundNumber = RoundNumber.create();

    //Arrange
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      inRule,
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(() => pointsManager.addRound(roundNumber)).toThrow(
      "Round already exists"
    );
  });

  it("should return true that round nr 2 is completed after 6 throws", () => {
    const roundNumber = RoundNumber.create();

    //Arrange
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      inRule,
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addRound(roundNumber.getNext());
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(roundNumber.getNext())).toBeTruthy();
  });

  it("should start with double-in rule and not finish round when hitting double segment", () => {
    //Arrange
    const roundNumber = RoundNumber.create();
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      DoubleInRule.create(),
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 2));

    //Assert
    expect(pointsManager.hasCompletedRound(roundNumber)).toBe(false);
    expect(pointsManager.pointsLeft.value).toBe(461);
  });

  it("should start with double-in rule and change to default after double throw", () => {
    //Arrange
    const roundNumber = RoundNumber.create();
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      DoubleInRule.create(),
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 2));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    const nextRound = roundNumber.getNext();
    pointsManager.addRound(nextRound);
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(nextRound)).toBe(false);
    expect(pointsManager.pointsLeft.value).toBe(401);
  });

  it("should start with double-in rule and dont change the rule if hit not a double segment", () => {
    //Arrange
    const roundNumber = RoundNumber.create();
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      DoubleInRule.create(),
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(roundNumber)).toBe(true);
    expect(pointsManager.pointsLeft.value).toBe(501);

    const nextRound = roundNumber.getNext();
    //Act
    pointsManager.addRound(nextRound);
    pointsManager.addThrow(new DartThrow(15, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(nextRound)).toBe(true);
    expect(pointsManager.pointsLeft.value).toBe(501);
  });

  it("should start with double-in rule and change rule to default after hitting double in second round", () => {
    //Arrange
    const roundNumber = RoundNumber.create();
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      DoubleInRule.create(),
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(roundNumber)).toBe(true);
    expect(pointsManager.pointsLeft.value).toBe(501);

    let nextRound = roundNumber.getNext();
    //Act
    pointsManager.addRound(nextRound);
    pointsManager.addThrow(new DartThrow(15, 2));
    pointsManager.addThrow(new DartThrow(15, 1));
    pointsManager.addThrow(new DartThrow(15, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(nextRound)).toBe(true);
    expect(pointsManager.pointsLeft.value).toBe(441);

    nextRound = nextRound.getNext();
    //Act
    pointsManager.addRound(nextRound);
    pointsManager.addThrow(new DartThrow(15, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(nextRound)).toBe(false);
    expect(pointsManager.pointsLeft.value).toBe(426);
  });

  it("should start with double-in rule and finish round when hitting not double segment", () => {
    //Arrange
    const roundNumber = RoundNumber.create();
    const pointsManager = new PlayerPoints(
      new Player("Rob"),
      Points.create(501),
      DoubleInRule.create(),
      outRule
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(roundNumber)).toBe(true);
    expect(pointsManager.pointsLeft.value).toBe(501);
  });
});
