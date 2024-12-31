import { defineStore } from "pinia";
import { IDartThrow } from "../classes/DartThrow";
import { Game, IGame } from "../classes/Game";
import { IPlayer, Player } from "../classes/Player";
import { GameNotStartedException } from "../exceptions/GameNotStartedException";
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
    getWinner(): IPlayer | null {
      this.ensureGameStarted();
      const winner = this.game?.getWinner();
      if (!winner) {
        return null;
      }
      return winner;
    },
    removeGame(): void {
      this.game = null;
    },
    createGame(players: string[], gameType: GameType): void {
      const startingPoints =
        gameType === "practice" ? Number.MAX_SAFE_INTEGER : parseInt(gameType);
      this.game = new Game(gameType, startingPoints);
      this.createPlayers(players);
    },
    createPlayers(players: string[]): void {
      this.ensureGameStarted();
      players.forEach((playerName) => {
        this.game?.addPlayer(new Player(playerName));
      });
    },
    startRoundForPlayer(): void {
      this.ensureGameStarted();
      this.game?.startRoundForPlayer();
    },
    addDartThrow(dartThrow: IDartThrow): void {
      this.ensureGameStarted();
      const activeRound = this.game?.getCurrentPlayer()?.getActiveRound();
      activeRound?.setThrow(dartThrow);
    },
    ensureGameStarted(): void {
      if (!this.game) {
        throw new GameNotStartedException("Game not created yet");
      }
    },
  },
});
