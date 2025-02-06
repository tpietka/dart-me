import { IDartThrow } from "./DartThrow";
import { IPlayer, Player } from "./Player";
import { NullRoundPoints, RoundPoints } from "./RoundPoints";
import { Points } from "./ValueObjects/Points";
import { RoundNumber } from "./ValueObjects/RoundNumber";

export interface IPlayerPoints {
  playerName: string;
  player: IPlayer;
  roundNumber: RoundNumber;
  pointsLeft: Points;
  throwPoints: IDartThrow[];
  scoredPoints: Points;
  throwNumber: number;
  addThrow(dartThrow: IDartThrow): void;
  hasWon(): boolean;
  hasCompletedRound(roundNumber: RoundNumber): boolean;
  addRound(roundNumber: RoundNumber): void;
}

export class PlayerPoints {
  private _player: IPlayer;
  private _points: RoundPoints[] = [];
  private readonly _startingPoints: Points;

  constructor(player: IPlayer, startingPoints: Points) {
    this._player = player;
    this._startingPoints = startingPoints;
  }

  public get roundNumber(): RoundNumber {
    return this.getActiveRoundPoints().roundNumber;
  }
  public get pointsLeft(): Points {
    return this.getActiveRoundPoints().pointsLeft;
  }
  public get scoredPoints(): Points {
    return this.getActiveRoundPoints().pointsScored;
  }
  public get playerName(): string {
    return this._player.getName();
  }

  public get player(): IPlayer {
    return this._player;
  }

  public get throwPoints() {
    return this.getActiveRoundPoints().throwPoints;
  }

  public get throwNumber(): number {
    return this.getActiveRoundPoints().throwNumber;
  }

  public addThrow(dartThrow: IDartThrow) {
    if (this.hasWon()) {
      throw new Error("Player has already won");
    }

    if (this.hasCompletedActiveRound()) {
      throw new Error("Round has already been completed");
    }

    if (this.getActiveRoundPoints() === null) {
      throw new Error("Round does not exist");
    }

    this.getActiveRoundPoints().addThrow(dartThrow);
  }
  public hasWon() {
    return this._points.some((round) => round.hasWon());
  }
  public hasCompletedRound(roundNumber: RoundNumber): boolean {
    return (
      this._points.find((roundPoints) =>
        roundPoints.roundNumber.equals(roundNumber)
      )?.hasCompletedRound ?? false
    );
  }
  public addRound(roundNumber: RoundNumber) {
    const previousRound = this.getActiveRoundPoints();
    if (roundNumber.equals(previousRound.roundNumber)) {
      throw new Error("Round already exists");
    }

    if (!previousRound.hasCompletedRound) {
      throw new Error("Previous round has not been completed");
    }

    const roundPoints = new RoundPoints(previousRound.pointsLeft, roundNumber);
    this._points.push(roundPoints);
  }
  private getActiveRoundPoints() {
    if (this._points.length > 0) {
      return this._points[this._points.length - 1];
    }
    return new NullRoundPoints(this._startingPoints);
  }
  private hasCompletedActiveRound() {
    return this.getActiveRoundPoints().hasCompletedRound ?? false;
  }
}

export class NullPlayerPoints extends PlayerPoints implements IPlayerPoints {
  public static create(): NullPlayerPoints {
    return new NullPlayerPoints(new Player("Nodody"), Points.zero);
  }
  public get pointsLeft(): Points {
    return Points.zero;
  }
  public get scoredPoints(): Points {
    return Points.zero;
  }
}
