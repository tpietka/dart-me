import { defineStore } from "pinia";
import { IDartThrow } from "../classes/DartThrow";
import { Game, NullGame } from "../classes/Game";
import { IPlayer, Player } from "../classes/Player";
import { Points } from "../classes/ValueObjects/Points";
import { ThrowResult } from "../classes/ThrowResult";
import { IPlayerPoints } from "../classes/PlayerPoints";
export type GameType = "301" | "501" | "Practice";

interface GameState {
  game: Game | NullGame;
  startingPoints: Points;
  gameType: string;
}
export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    game: NullGame.create(Points.zero),
    startingPoints: Points.zero,
    gameType: "",
  }),
  getters: {
    pointsLeft(): number {
      return this.game.getCurrentPlayer()?.pointsLeft.value ?? 1;
    },
    currentPlayer(): IPlayerPoints {
      return this.game.getCurrentPlayer();
    },
    round(): number {
      return this.game.roundNumber.value;
    },
    throwNumber(): number {
      return this.game.getCurrentPlayer()?.throwNumber ?? 1;
    },
  },
  actions: {
    getWinner(): IPlayer | null {
      const winner = this.game?.getWinner();
      if (!winner) {
        return null;
      }
      return winner;
    },
    removeGame(): void {
      this.startingPoints = Points.zero;
      this.gameType = "";
      this.game = NullGame.create(this.startingPoints as Points);
    },
    createGame(players: string[], gameType: GameType): void {
      this.gameType = gameType;
      this.startingPoints = Points.create(
        gameType === "Practice" ? Number.MAX_SAFE_INTEGER : parseInt(gameType)
      );
      this.game = Game.create(this.startingPoints as Points);
      this.createPlayers(players);
    },
    createPlayers(players: string[]): void {
      players.forEach((playerName) => {
        this.game.addPlayerPoints(new Player(playerName));
      });
    },
    startRoundForPlayer(): void {
      this.game.startRoundForPlayer();
    },
    addDartThrow(dartThrow: IDartThrow): ThrowResult {
      return this.game.addThrow(dartThrow);
    },
  },
});
