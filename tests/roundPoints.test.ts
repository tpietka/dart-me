import { DartThrow } from "../src/classes/DartThrow";
import { Player } from "../src/classes/Player";
import { RoundPoints } from "../src/classes/RoundPoints";
import { RoundNumber } from "../src/classes/ValueObjects/RoundNumber";

const roundNumber = RoundNumber.create();

describe("test RoundPoints class", () => {
  it("should have throws count greater equal to 1 after adding throw", () => {
    //Arrange
    const roundPoints = new RoundPoints(500, roundNumber);

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));

    //Assert
    expect(roundPoints.throwsCount).toBe(1);
  });

  it("should finish round and reset points if throw is bust", () => {
    //Arrange
    const roundPoints = new RoundPoints(5, roundNumber);

    //Act
    roundPoints.addThrow(new DartThrow(10, 1));

    //Assert
    expect(roundPoints.throwsCount).toBe(3);
    expect(roundPoints.pointsLeft).toBe(5);
  });

  it("should show correct score after two throws", () => {
    //Arrange
    const roundPoints = new RoundPoints(100, roundNumber);

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));
    roundPoints.addThrow(new DartThrow(6, 2));

    //Assert
    expect(roundPoints.pointsScored).toBe(32);
    expect(roundPoints.pointsLeft).toBe(68);
  });

  it("should show there is throw left after two throws", () => {
    //Arrange
    const roundPoints = new RoundPoints(100, roundNumber);

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));
    roundPoints.addThrow(new DartThrow(6, 2));

    //Assert
    expect(roundPoints.hasCompletedRound).toBe(false);
  });

  it("should show there is no throw left after three throws", () => {
    //Arrange
    const roundPoints = new RoundPoints(100, roundNumber);

    //Act
    roundPoints.addThrow(new DartThrow(20, 1));
    roundPoints.addThrow(new DartThrow(6, 2));
    roundPoints.addThrow(new DartThrow(2, 2));

    //Assert
    expect(roundPoints.hasCompletedRound).toBe(true);
  });

  it("should show that player has not won when have remaining points to score", () => {
    //Arrange
    const roundPoints = new RoundPoints(200, roundNumber);

    //Act
    roundPoints.addThrow(new DartThrow(20, 3));
    roundPoints.addThrow(new DartThrow(10, 1));
    roundPoints.addThrow(new DartThrow(20, 2));

    //Assert
    expect(roundPoints.hasWon()).toBe(false);
  });

  it("should show that player has won when last throw was double", () => {
    //Arrange
    const roundPoints = new RoundPoints(100, roundNumber);

    //Act
    roundPoints.addThrow(new DartThrow(20, 3));
    roundPoints.addThrow(new DartThrow(20, 2));

    //Assert
    expect(roundPoints.hasWon()).toBe(true);
  });

  it("should show that player has not won when last throw was not double", () => {
    //Arrange
    const roundPoints = new RoundPoints(100, roundNumber);

    //Act
    roundPoints.addThrow(new DartThrow(20, 2));
    roundPoints.addThrow(new DartThrow(20, 3));

    //Assert
    expect(roundPoints.hasWon()).toBe(false);
  });
});
