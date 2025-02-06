import { Game, IGame, NullGame } from "../src/classes/Game";
import { Points } from "../src/classes/ValueObjects/Points";
import { Player } from "../src/classes/Player";
import { DartThrow, IDartThrow } from "../src/classes/DartThrow";
import { ThrowResult } from "../src/classes/ThrowResult";

describe("Game Class", () => {
  let game: IGame;

  beforeEach(() => {
    game = Game.create(Points.create(301));
  });

  test("should add players to the game", () => {
    const player = new Player("John");
    game.addPlayerPoints(player);
    expect(game.getPlayersNames().length).toBe(1);
    expect(game.getPlayersNames().includes("John")).toBeTruthy();
  });

  test("should add a dart throw for the current player", () => {
    const player = new Player("John");
    game.addPlayerPoints(player);
    game.startRoundForPlayer();
    const dartThrow = new DartThrow(20, 1);
    game.getCurrentPlayer()?.addThrow(dartThrow);
    expect(game.getCurrentPlayer()?.pointsLeft.value).toBe(281);
  });

  test("should finish the game when a player reaches zero points", () => {
    const player = new Player("John");
    game.addPlayerPoints(player);
    game.startRoundForPlayer();
    const dartThrow = new DartThrow(20, 3);
    game.addThrow(dartThrow);
    game.addThrow(dartThrow);
    game.addThrow(dartThrow);
    game.startRoundForPlayer();
    game.addThrow(dartThrow);
    game.addThrow(new DartThrow(1, 1));
    game.addThrow(new DartThrow(20, 1));
    game.startRoundForPlayer();
    game.addThrow(new DartThrow(20, 2));

    expect(game.isGameFinished()).toBe(true);
  });

  test("should return the winner when the game is finished", () => {
    const player = new Player("John");
    game.addPlayerPoints(player);
    game.startRoundForPlayer();
    const dartThrow = new DartThrow(20, 3);
    game.addThrow(dartThrow);
    game.addThrow(dartThrow);
    game.addThrow(dartThrow);
    game.startRoundForPlayer();
    game.addThrow(dartThrow);
    game.addThrow(new DartThrow(1, 1));
    game.addThrow(new DartThrow(20, 1));
    game.startRoundForPlayer();
    game.addThrow(new DartThrow(20, 2));

    expect(game.getWinner()?.getName()).toBe("John");
  });

  test("should return null when there is no winner", () => {
    expect(game.getWinner()).toBeNull();
  });

  test("should reset the game", () => {
    game = NullGame.create(Points.zero);
    expect(() => game.addPlayerPoints(new Player("Bob"))).toThrow(
      "Game not created yet"
    );
  });
});
