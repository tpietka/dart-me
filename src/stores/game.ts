import { defineStore } from "pinia";
import { Player } from "../classes/Player";
import { Round } from "../classes/Round";
import { DartThrow } from "../classes/DartThrow";
export type GameType = "301" | "501" | "practice";

interface GameState {
  players: Player[];
  round: number;
  currentPlayer: Player | null;
  startingPoints: number;
}
export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    players: [],
    round: 1,
    currentPlayer: null,
    startingPoints: 0,
  }),
  actions: {
    createGame(players: string[], gameType: GameType) {
      this.startingPoints =
        gameType === "practice" ? Number.MAX_SAFE_INTEGER : parseInt(gameType);
      players.forEach((player) => {
        this.players.push({
          name: player,
          rounds: [],
        });
      });
    },
    startRoundForPlayer() {
      this.nextPlayer();
      if (this.isEndOfRound()) {
        this.nextRound();
      }
      const lastRound = this.getLastRound();
      this.currentPlayer?.rounds.push(
        new Round(lastRound?.pointsLeft ?? this.startingPoints, this.round)
      );
    },
    nextPlayer() {
      if (!this.currentPlayer) {
        {
          this.currentPlayer = this.players[0];
        }
      } else {
        const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
        this.currentPlayer = this.players[currentPlayerIndex + 1];
      }
    },
    addDartThrow(dartThrow: DartThrow) {
      const lastRound = this.getLastRound();
      lastRound?.setThrow(dartThrow);
      if (lastRound?.throws.length === 3) {
        let throwsSum = 0;
        lastRound.throws.forEach((dartThrow) => {
          throwsSum += dartThrow.getScore();
        });
        lastRound.pointsLeft = lastRound.pointsLeft - throwsSum;
      }
    },
    isEndOfRound() {
      return this.players.every(
        (player) => player.rounds.length === this.round
      );
    },
    nextRound() {
      this.round++;
    },
    getLastRound() {
      return this.currentPlayer?.rounds[this.currentPlayer.rounds.length - 1];
    },
  },
});
