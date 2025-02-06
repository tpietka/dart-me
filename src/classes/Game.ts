import { IPlayer } from "./Player";
import { IPlayerPoints, PlayerPoints } from "./PlayerPoints";
import { Points } from "./ValueObjects/Points";
import { RoundNumber } from "./ValueObjects/RoundNumber";

export interface IGame {
  addPlayerPoints(player: IPlayer): void;
}

export class Game implements IGame {
  private playerPointss: IPlayerPoints[] = [];
  private winner: IPlayer | null = null;
  private currentPlayerManager: IPlayerPoints | null = null;
  private roundNumber: RoundNumber = RoundNumber.create();
  private startingPoints: Points;

  constructor(startingPoints: Points) {
    this.startingPoints = startingPoints;
  }
  public addPlayerPoints(player: IPlayer): void {
    const manager = new PlayerPoints(player, this.startingPoints);
    this.playerPointss.push(manager);
  }
  public getPlayersNames(): string[] {
    return this.playerPointss.map((manager) => manager.playerName);
  }
  public getRoundNumber(): RoundNumber {
    return this.roundNumber;
  }
  public startRoundForPlayer(): void {
    this.nextPlayer();
    if (this.isEndOfRound()) {
      this.nextRound();
    }
    this.currentPlayerManager?.addRound(this.roundNumber);
  }
  public isGameFinished(): boolean {
    if (this.currentPlayerManager?.hasWon()) {
      this.winner = this.currentPlayerManager?.player;
      return true;
    }
    return false;
  }
  public getCurrentPlayerManager(): IPlayerPoints | null {
    return this.currentPlayerManager;
  }
  public getWinner(): IPlayer | null {
    return this.winner;
  }
  private nextRound(): void {
    this.roundNumber = this.roundNumber.next();
  }
  private isEndOfRound(): boolean {
    return this.playerPointss.every((manager) =>
      manager.hasCompletedRound(this.roundNumber)
    );
  }
  private nextPlayer(): void {
    if (!this.currentPlayerManager) {
      {
        this.currentPlayerManager = this.playerPointss[0];
      }
    } else {
      const nextPlayerIndex =
        (this.playerPointss.indexOf(this.currentPlayerManager) + 1) %
        this.playerPointss.length;
      this.currentPlayerManager = this.playerPointss[nextPlayerIndex];
    }
  }
}
