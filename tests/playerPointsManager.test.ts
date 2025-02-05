import { DartThrow } from "../src/classes/DartThrow";
import { Player } from "../src/classes/Player";
import { PlayerPointsManager } from "../src/classes/PlayerPointsManager";
import { Points } from "../src/classes/ValueObjects/Points";
import { RoundNumber } from "../src/classes/ValueObjects/RoundNumber";

describe("test PlayerPointsManager class", () => {
  it("should return last round", () => {
    const roundNumber = RoundNumber.create();
    //Arrange
    const pointsManager = new PlayerPointsManager(
      new Player("Rob"),
      Points.create(501)
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addRound(roundNumber.next());
    //Assert
    expect(pointsManager.roundNumber.value).toBe(2);
  });

  it("should display correct remaining points to score after two rounds", () => {
    const roundNumber = RoundNumber.create();

    //Arrange
    const pointsManager = new PlayerPointsManager(
      new Player("Rob"),
      Points.create(501)
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
    const pointsManager = new PlayerPointsManager(
      new Player("Rob"),
      Points.create(501)
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(() => pointsManager.addRound(roundNumber.next())).toThrow(
      "Previous round has not been completed"
    );
  });

  it("should throw expception if round with round number already exists", () => {
    const roundNumber = RoundNumber.create();

    //Arrange
    const pointsManager = new PlayerPointsManager(
      new Player("Rob"),
      Points.create(501)
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
    const pointsManager = new PlayerPointsManager(
      new Player("Rob"),
      Points.create(501)
    );

    //Act
    pointsManager.addRound(roundNumber);
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addRound(roundNumber.next());
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(pointsManager.hasCompletedRound(roundNumber.next())).toBeTruthy();
  });
});
