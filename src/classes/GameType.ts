import { StartingPoints } from "./StartingPoints";
import { Points } from "./valueObjects/Points";

export class GameType {
  private _type: GameTypes;
  private _startingPoints: Points;
  constructor(gameType: GameTypes) {
    this._type = gameType;
    this._startingPoints = StartingPoints.prepareGameStartingPoints(this._type);
  }

  public getStartingPoints(): Points {
    return this._startingPoints;
  }
  public getGameTypeName(): string {
    return this._type.toString();
  }
}

export type GameTypes = "301" | "501" | "Practice";
