import { defineStore } from "pinia";
import { DartThrow, IDartThrow } from "../classes/DartThrow";
import { Game, IGame } from "../classes/Game";
import { IPlayer, Player } from "../classes/Player";
export type GameType = "301" | "501" | "practice";

interface GameState {
  game: IGame | null;
}
export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    game: null,
  }),
  getters: {
    pointsLeft(): number {
      if (!this.game) {
        return 0;
      }
      return (
        this.game.getCurrentPlayer()?.getActiveRound()?.getPointsLeft() ??
        this.game.startingPoints
      );
    },
    currentPlayer(): IPlayer | null {
      if (!this.game) {
        return null;
      }
      return this.game.getCurrentPlayer();
    },
    round(): number {
      if (!this.game) {
        return 0;
      }
      return this.game.getRoundNumber();
    },
  },
  actions: {
    createGame(players: string[], gameType: GameType): void {
      const startingPoints =
        gameType === "practice" ? Number.MAX_SAFE_INTEGER : parseInt(gameType);
      this.game = new Game(gameType, startingPoints);
      this.createPlayers(players);
    },
    createPlayers(players: string[]): void {
      if (!this.game) {
        return;
      }
      players.forEach((playerName) => {
        this.game?.addPlayer(new Player(playerName));
      });
    },
    startRoundForPlayer(): void {
      if (!this.game) {
        return;
      }
      this.game.startRoundForPlayer();
    },
    addDartThrow(dartThrow: IDartThrow): void {
      if (!this.game) {
        return;
      }
      const activeRound = this.game.getCurrentPlayer()?.getActiveRound();
      activeRound?.setThrow(dartThrow);
    },
  },
});
