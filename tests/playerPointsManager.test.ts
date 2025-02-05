import { DartThrow } from "../src/classes/DartThrow";
import { Player } from "../src/classes/Player";
import { PlayerPointsManager } from "../src/classes/PlayerPointsManager";

describe("test PlayerPointsManager class", () => {
  it("should return last round", () => {
    //Arrange
    const pointsManager = new PlayerPointsManager(new Player("Rob"), 501);

    //Act
    pointsManager.addRound(1);
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addRound(2);
    //Assert
    expect(pointsManager.getActiveRoundPoints().roundNumber).toBe(2);
  });

  it("should display correct remaining points to score after two rounds", () => {
    //Arrange
    const pointsManager = new PlayerPointsManager(new Player("Rob"), 501);

    //Act
    pointsManager.addRound(1);
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(pointsManager.scoredPoints).toBe(60);
  });

  it("should block creating new round if the previous one is not finished", () => {
    //Arrange
    const pointsManager = new PlayerPointsManager(new Player("Rob"), 501);

    //Act
    pointsManager.addRound(1);
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(() => pointsManager.addRound(2)).toThrow(
      "Previous round has not been completed"
    );
  });

  it("should throw expception if round with round number already exists", () => {
    //Arrange
    const pointsManager = new PlayerPointsManager(new Player("Rob"), 501);

    //Act
    pointsManager.addRound(1);
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));
    pointsManager.addThrow(new DartThrow(20, 1));

    //Assert
    expect(() => pointsManager.addRound(1)).toThrow("Round already exists");
  });
});
