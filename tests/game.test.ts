import { Game, IGame, NullGame } from "../src/classes/Game";
import { Points } from "../src/classes/valueObjects/Points";
import { Player } from "../src/classes/Player";
import { DartThrow } from "../src/classes/DartThrow";
import { ThrowResult } from "../src/classes/ThrowResult";
import { DefaultInRule } from "../src/classes/rules/DefaultInRule";
import { DoubleOutRule } from "../src/classes/rules/DoubleOutRule";

describe("Game Class", () => {
  let game: IGame;
  let inRule = DefaultInRule.create();
  let outRule = DoubleOutRule.create();

  beforeEach(() => {
    game = Game.create(Points.create(301), inRule, outRule);
  });

  test("should add players to the game", () => {
    const player = new Player("John");
    game.addPlayerPoints(player, inRule, outRule);
    expect(game.getPlayersNames().length).toBe(1);
    expect(game.getPlayersNames().includes("John")).toBeTruthy();
  });

  test("should add a dart throw for the current player", () => {
    const player = new Player("John");
    game.addPlayerPoints(player, inRule, outRule);
    game.startRoundForPlayer();
    const dartThrow = new DartThrow(20, 1);
    game.getCurrentPlayer()?.addThrow(dartThrow);
    expect(game.getCurrentPlayer()?.pointsLeft.value).toBe(281);
  });

  test("should finish the game when a player reaches zero points", () => {
    const player = new Player("John");
    game.addPlayerPoints(player, inRule, outRule);
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

  test("should finish the game when a player reaches zero points", () => {
    const player = new Player("John");
    game.addPlayerPoints(player, inRule, outRule);
    game.startRoundForPlayer();
    const dartThrow = new DartThrow(20, 3);
    game.addThrow(dartThrow);
    game.addThrow(dartThrow);
    game.addThrow(dartThrow);
    game.startRoundForPlayer();
    game.addThrow(new DartThrow(20, 1));
    game.addThrow(new DartThrow(11, 1));
    game.addThrow(new DartThrow(20, 2));
    game.startRoundForPlayer();
    game.addThrow(new DartThrow(25, 2));

    expect(game.isGameFinished()).toBe(true);
  });

  test("should return the winner when the game is finished", () => {
    const player = new Player("John");
    game.addPlayerPoints(player, inRule, outRule);
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
    expect(() =>
      game.addPlayerPoints(new Player("Bob"), inRule, outRule)
    ).toThrow("Game not created yet");
  });
});
