import { defineStore } from "pinia";
import { IDartThrow } from "../classes/DartThrow";
import { Game } from "../classes/Game";
import { IPlayer, Player } from "../classes/Player";
import { GameNotStartedException } from "../exceptions/GameNotStartedException";
import { Points } from "../classes/ValueObjects/Points";
import { PlayerPointsManager } from "../classes/PlayerPointsManager";
import { ThrowResult } from "../classes/ThrowResult";
export type GameType = "301" | "501" | "practice";

interface GameState {
  game: Game | null;
  startingPoints: Points;
}
export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    game: null,
    startingPoints: Points.zero,
  }),
  getters: {
    pointsLeft(): number {
      if (!this.game) {
        return 0;
      }
      return this.game.getCurrentPlayerManager()?.pointsLeft.value ?? 1;
    },
    currentPlayer(): PlayerPointsManager | null {
      if (!this.game) {
        return null;
      }
      return this.game.getCurrentPlayerManager();
    },
    round(): number {
      if (!this.game) {
        return 0;
      }
      return this.game.getRoundNumber().value;
    },
    throwNumber(): number {
      if (!this.game) {
        return 0;
      }
      return this.game.getCurrentPlayerManager()?.throwNumber ?? 1;
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
      this.startingPoints = Points.create(
        gameType === "practice" ? Number.MAX_SAFE_INTEGER : parseInt(gameType)
      );
      this.game = new Game(this.startingPoints as Points);
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
    addDartThrow(dartThrow: IDartThrow): ThrowResult {
      this.ensureGameStarted();
      this.game?.getCurrentPlayerManager()?.addThrow(dartThrow);
      if (this.game?.isGameFinished()) {
        return ThrowResult.gameFinished();
      }
      if (this.currentPlayer?.hasCompletedRound(this.game?.getRoundNumber()!)) {
        return ThrowResult.roundFinished();
      }
      return ThrowResult.continueGame();
    },
    ensureGameStarted(): void {
      if (!this.game) {
        throw new GameNotStartedException("Game not created yet");
      }
    },
  },
});
