import { GameTypes } from "./GameType";
import { Points } from "./valueObjects/Points";

export class StartingPoints {
  public static prepareGameStartingPoints(gameType: GameTypes): Points {
    if (gameType === "Practice") {
      return Points.create(Number.MAX_SAFE_INTEGER);
    }
    return Points.create(Number(gameType));
  }
}
