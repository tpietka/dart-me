import { GameNotStartedException } from "../exceptions/GameNotStartedException";
import { IDartThrow } from "./DartThrow";
import { GameType } from "./GameType";
import { IInRule } from "./IInRule";
import { IOutRule } from "./IOutRule";
import { IPlayer } from "./Player";
import { IPlayerPoints, NullPlayerPoints, PlayerPoints } from "./PlayerPoints";
import { ThrowResult } from "./ThrowResult";
import { Points } from "./valueObjects/Points";
import { RoundNumber } from "./valueObjects/RoundNumber";

export interface IGame {
  roundNumber: RoundNumber;
  addThrow(dartThrow: IDartThrow): ThrowResult;
  addPlayerPoints(player: IPlayer, inRule: IInRule, outRule: IOutRule): void;
  getPlayersNames(): string[];
  getWinner(): IPlayer | null;
  getGameType(): string;
  startRoundForPlayer(): void;
  isGameFinished(): boolean;
  getCurrentPlayer(): IPlayerPoints | null;
}

export class Game implements IGame {
  private _playerPoints: IPlayerPoints[] = [];
  private _winner: IPlayer | null = null;
  private _currentPlayerPoints: IPlayerPoints;
  private _roundNumber: RoundNumber = RoundNumber.create();
  private _startingPoints: Points;
  private _gameType: GameType;

  private constructor(
    gameType: GameType,
    private inRule: IInRule,
    private outRule: IOutRule
  ) {
    this._gameType = gameType;
    this._startingPoints = gameType.getStartingPoints();
    this._currentPlayerPoints = NullPlayerPoints.create();
  }
  public static create(
    gameType: GameType,
    inRule: IInRule,
    outRule: IOutRule
  ): Game {
    return new Game(gameType, inRule, outRule);
  }
  public get roundNumber(): RoundNumber {
    return this._roundNumber;
  }
  public getWinner(): IPlayer | null {
    return this._winner;
  }
  public getGameType(): string {
    return this._gameType.getGameTypeName();
  }
  public addPlayerPoints(player: IPlayer): void {
    const manager = new PlayerPoints(
      player,
      this._startingPoints,
      this.inRule,
      this.outRule
    );
    this._playerPoints.push(manager);
  }
  public getPlayersNames(): string[] {
    return this._playerPoints.map((manager) => manager.playerName);
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
    this._roundNumber = this._roundNumber.getNext();
  }
  private isEndOfRound(): boolean {
    return this._playerPoints.every((manager) =>
      manager.hasCompletedRound(this._roundNumber)
    );
  }
  private nextPlayer(): void {
    if (!this._currentPlayerPoints) {
      {
        this._currentPlayerPoints = this._playerPoints[0];
      }
    } else {
      const nextPlayerIndex =
        (this._playerPoints.indexOf(this._currentPlayerPoints) + 1) %
        this._playerPoints.length;
      this._currentPlayerPoints = this._playerPoints[nextPlayerIndex];
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
  getGameType(): string {
    return "-";
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
