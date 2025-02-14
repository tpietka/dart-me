import { IDartThrow } from "./DartThrow";
import { IRuleMessage } from "./IRuleMessage";
import { Points } from "./valueObjects/Points";

export interface IOutRule extends IRuleMessage {
  isBust(_pointsLeft: Points): boolean;
  pass(dartThrow: IDartThrow, pointsLeft: Points): boolean;
}
