import { IDartThrow } from "./DartThrow";
import { Points } from "./valueObjects/Points";

export interface IOutRule {
  minimalPointsLeftToWin: Points;
  pass(dartThrow: IDartThrow, pointsLeft: Points): boolean;
}
