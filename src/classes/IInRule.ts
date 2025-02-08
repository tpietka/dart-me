import { IDartThrow } from "./DartThrow";

export interface IInRule {
  pass(dartThrow: IDartThrow): boolean;
}
