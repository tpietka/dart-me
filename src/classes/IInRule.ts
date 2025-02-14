import { IDartThrow } from "./DartThrow";
import { IRuleMessage } from "./IRuleMessage";

export interface IInRule extends IRuleMessage {
  pass(dartThrow: IDartThrow): boolean;
}
