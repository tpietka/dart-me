import { IDartThrow } from "./DartThrow";
import { Points } from "./valueObjects/Points";

export interface IOutRule {
  isBust(_pointsLeft: Points): boolean;
  pass(dartThrow: IDartThrow, pointsLeft: Points): boolean;
}
