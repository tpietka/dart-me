import { GameNotStartedException } from "../exceptions/GameNotStartedException";
import { IDartThrow } from "./DartThrow";
import { IPlayer } from "./Player";
import { IPlayerPoints, NullPlayerPoints, PlayerPoints } from "./PlayerPoints";
import { ThrowResult } from "./ThrowResult";
import { Points } from "./ValueObjects/Points";
import { RoundNumber } from "./ValueObjects/RoundNumber";

export interface IGame {
  roundNumber: RoundNumber;
  addThrow(dartThrow: IDartThrow): ThrowResult;
  addPlayerPoints(player: IPlayer): void;
  getPlayersNames(): string[];
  getWinner(): IPlayer | null;
  startRoundForPlayer(): void;
  isGameFinished(): boolean;
  getCurrentPlayer(): IPlayerPoints | null;
}

export class Game implements IGame {
  private _playerPointss: IPlayerPoints[] = [];
  private _winner: IPlayer | null = null;
  private _currentPlayerPoints: IPlayerPoints;
  private _roundNumber: RoundNumber = RoundNumber.create();
  private _startingPoints: Points;

  private constructor(startingPoints: Points) {
    this._startingPoints = startingPoints;
    this._currentPlayerPoints = NullPlayerPoints.create();
  }
  public static create(startingPoints: Points): Game {
    return new Game(startingPoints);
  }
  public get roundNumber(): RoundNumber {
    return this._roundNumber;
  }
  public getWinner(): IPlayer | null {
    return this._winner;
  }
  public addPlayerPoints(player: IPlayer): void {
    const manager = new PlayerPoints(player, this._startingPoints);
    this._playerPointss.push(manager);
  }
  public getPlayersNames(): string[] {
    return this._playerPointss.map((manager) => manager.playerName);
  }
  public startRoundForPlayer(): void {
    this.nextPlayer();
    if (this.isEndOfRound()) {
      this.nextRound();
    }
    this._currentPlayerPoints?.addRound(this._roundNumber);
  }
  public isGameFinished(): boolean {
    if (this._currentPlayerPoints?.hasWon()) {
      this._winner = this._currentPlayerPoints?.player;
      return true;
    }
    return false;
  }
  public addThrow(dartThrow: IDartThrow): ThrowResult {
    this.getCurrentPlayer()?.addThrow(dartThrow);
    if (this.isGameFinished()) {
      return ThrowResult.gameFinished();
    }
    if (
      this.getCurrentPlayer()?.hasCompletedRound(
        this.roundNumber as RoundNumber
      )
    ) {
      return ThrowResult.roundFinished();
    }
    return ThrowResult.continueGame();
  }
  public getCurrentPlayer(): IPlayerPoints {
    if (this._currentPlayerPoints == null) {
      return NullPlayerPoints.create();
    }
    return this._currentPlayerPoints;
  }
  private nextRound(): void {
    this._roundNumber = this._roundNumber.next();
  }
  private isEndOfRound(): boolean {
    return this._playerPointss.every((manager) =>
      manager.hasCompletedRound(this._roundNumber)
    );
  }
  private nextPlayer(): void {
    if (!this._currentPlayerPoints) {
      {
        this._currentPlayerPoints = this._playerPointss[0];
      }
    } else {
      const nextPlayerIndex =
        (this._playerPointss.indexOf(this._currentPlayerPoints) + 1) %
        this._playerPointss.length;
      this._currentPlayerPoints = this._playerPointss[nextPlayerIndex];
    }
  }
}

export class NullGame implements IGame {
  private _startingPoints: Points;
  private _currentPlayerPoints: IPlayerPoints;
  private constructor(startingPoints: Points) {
    this._startingPoints = startingPoints;
    this._currentPlayerPoints = NullPlayerPoints.create();
  }

  public get points() {
    return this._startingPoints;
  }

  public get roundNumber(): RoundNumber {
    return RoundNumber.zero;
  }
  public static create(startingPoints: Points): NullGame {
    return new NullGame(startingPoints);
  }
  addThrow(): ThrowResult {
    throw new GameNotStartedException("Game not created yet");
  }
  addPlayerPoints(): void {
    throw new GameNotStartedException("Game not created yet");
  }
  getPlayersNames(): string[] {
    throw new GameNotStartedException("Game not created yet");
  }
  getWinner(): IPlayer | null {
    throw new GameNotStartedException("Game not created yet");
  }
  startRoundForPlayer(): void {
    throw new GameNotStartedException("Game not created yet");
  }
  isGameFinished(): boolean {
    throw new GameNotStartedException("Game not created yet");
  }
  getCurrentPlayer(): IPlayerPoints {
    return this._currentPlayerPoints;
  }
}
