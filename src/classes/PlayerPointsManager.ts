import { DartThrow } from "./DartThrow";
import { IPlayer } from "./Player";
import { NullRoundPoints, RoundPoints } from "./RoundPoints";

export class PlayerPointsManager {
  private _player: IPlayer;
  private _points: RoundPoints[] = [];
  private readonly _startingPoints;

  constructor(player: IPlayer, startingPoints: number) {
    this._player = player;
    this._startingPoints = startingPoints;
  }

  get scoredPoints(): number {
    return this.getActiveRoundPoints().pointsScored ?? 0;
  }
  get player(): IPlayer {
    return this._player;
  }

  addThrow(dartThrow: DartThrow) {
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
  hasWon() {
    return this._points.some((round) => round.hasWon());
  }
  addRound(roundNumber: number) {
    const previousRound = this.getActiveRoundPoints();
    if (previousRound.roundNumber === roundNumber) {
      throw new Error("Round already exists");
    }

    if (!previousRound.hasCompletedRound) {
      throw new Error("Previous round has not been completed");
    }

    const pointsToScore = previousRound.pointsLeft ?? this._startingPoints;

    const roundPoints = new RoundPoints(pointsToScore, roundNumber);
    this._points.push(roundPoints);
  }
  getActiveRoundPoints() {
    if (this._points.length > 0) {
      return this._points[this._points.length - 1];
    }
    return new NullRoundPoints(this._startingPoints);
  }
  hasCompletedActiveRound() {
    return this.getActiveRoundPoints().hasCompletedRound ?? false;
  }
}
