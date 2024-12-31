import { GameType } from "../stores/game";
import { IPlayer } from "./Player";
import { Round } from "./Round";

export interface IGame {
  startingPoints: number;
  gameType: GameType;
  addPlayer(player: IPlayer): void;
  getCurrentPlayer(): IPlayer | null;
  getRoundNumber(): number;
  startRoundForPlayer(): void;
  getWinner(): IPlayer | null;
  isGameFinished(): boolean;
  getPlayersNames(): string[];
}

export class Game implements IGame {
  private players: IPlayer[];
  private winner: IPlayer | null = null;
  private currentPlayer: IPlayer | null = null;
  private round: number = 1;
  public startingPoints = 0;
  public gameType;

  constructor(gameType: GameType, startingPoints: number) {
    this.startingPoints = startingPoints;
    this.players = [];
    this.gameType = gameType;
  }
  addPlayer(player: IPlayer): void {
    this.players.push(player);
  }
  getPlayersNames(): string[] {
    return this.players.map((player) => player.getName());
  }
  getRoundNumber(): number {
    return this.round;
  }
  public isGameFinished(): boolean {
    if (this.currentPlayer?.hasWon()) {
      this.winner = this.currentPlayer;
      return true;
    }
    return false;
  }
  getCurrentPlayer(): IPlayer | null {
    return this.currentPlayer;
  }
  getWinner(): IPlayer | null {
    return this.winner;
  }
  private nextRound(): void {
    this.round++;
  }
  private isEndOfRound(): boolean {
    return this.players.every((player) =>
      player.hasCompletedActiveRound(this.round)
    );
  }
  private nextPlayer(): void {
    if (!this.currentPlayer) {
      {
        this.currentPlayer = this.players[0];
      }
    } else {
      const nextPlayerIndex =
        (this.players.indexOf(this.currentPlayer) + 1) % this.players.length;
      this.currentPlayer = this.players[nextPlayerIndex];
    }
  }
  startRoundForPlayer(): void {
    this.nextPlayer();
    if (this.isEndOfRound()) {
      this.nextRound();
    }
    const lastRound = this.currentPlayer?.getActiveRound();
    this.currentPlayer?.addRound(
      new Round(lastRound?.getPointsLeft() ?? this.startingPoints, this.round)
    );
  }
}
