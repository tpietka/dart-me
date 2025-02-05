import { DartThrow } from "./DartThrow";
import { IPlayer } from "./Player";
import { NullRoundPoints, RoundPoints } from "./RoundPoints";
import { RoundNumber } from "./ValueObjects/RoundNumber";

export class PlayerPointsManager {
  private _player: IPlayer;
  private _points: RoundPoints[] = [];
  private readonly _startingPoints;

  constructor(player: IPlayer, startingPoints: number) {
    this._player = player;
    this._startingPoints = startingPoints;
  }

  public get roundNumber(): RoundNumber {
    return this.getActiveRoundPoints().roundNumber;
  }

  public get scoredPoints(): number {
    return this.getActiveRoundPoints().pointsScored ?? 0;
  }
  public get player(): IPlayer {
    return this._player;
  }

  public addThrow(dartThrow: DartThrow) {
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
  public addRound(roundNumber: RoundNumber) {
    const previousRound = this.getActiveRoundPoints();
    if (roundNumber.equals(previousRound.roundNumber)) {
      throw new Error("Round already exists");
    }

    if (!previousRound.hasCompletedRound) {
      throw new Error("Previous round has not been completed");
    }

    const pointsToScore = previousRound.pointsLeft ?? this._startingPoints;

    const roundPoints = new RoundPoints(pointsToScore, roundNumber);
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
