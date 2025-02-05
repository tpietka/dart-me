import { IPlayer } from "./Player";
import { PlayerPointsManager } from "./PlayerPointsManager";
import { Points } from "./ValueObjects/Points";
import { RoundNumber } from "./ValueObjects/RoundNumber";

export class Game {
  private players: IPlayer[];
  private playerPointsManagers: PlayerPointsManager[] = [];
  private winner: IPlayer | null = null;
  private currentPlayerManager: PlayerPointsManager | null = null;
  private roundNumber: RoundNumber = RoundNumber.create();
  private startingPoints: Points;

  constructor(startingPoints: Points) {
    this.startingPoints = startingPoints;
    this.players = [];
  }
  addPlayer(player: IPlayer): void {
    this.players.push(player);
  }
  addPlayerPointsManager(player: IPlayer): void {
    const manager = new PlayerPointsManager(player, this.startingPoints);
    this.playerPointsManagers.push(manager);
  }
  getPlayersNames(): string[] {
    return this.playerPointsManagers.map((manager) => manager.playerName);
  }
  getRoundNumber(): RoundNumber {
    return this.roundNumber;
  }
  public isGameFinished(): boolean {
    if (this.currentPlayerManager?.hasWon()) {
      this.winner = this.currentPlayerManager?.player;
      return true;
    }
    return false;
  }
  getCurrentPlayerManager(): PlayerPointsManager | null {
    return this.currentPlayerManager;
  }
  getWinner(): IPlayer | null {
    return this.winner;
  }
  private nextRound(): void {
    this.roundNumber = this.roundNumber.next();
  }
  private isEndOfRound(): boolean {
    return this.playerPointsManagers.every((manager) =>
      manager.hasCompletedRound(this.roundNumber)
    );
  }
  private nextPlayer(): void {
    if (!this.currentPlayerManager) {
      {
        this.currentPlayerManager = this.playerPointsManagers[0];
      }
    } else {
      const nextPlayerIndex =
        (this.playerPointsManagers.indexOf(this.currentPlayerManager) + 1) %
        this.playerPointsManagers.length;
      this.currentPlayerManager = this.playerPointsManagers[nextPlayerIndex];
    }
  }
  startRoundForPlayer(): void {
    this.nextPlayer();
    if (this.isEndOfRound()) {
      this.nextRound();
    }
    this.currentPlayerManager?.addRound(this.roundNumber);
  }
}
