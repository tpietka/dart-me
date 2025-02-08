import { IInRule } from "../IInRule";

export class DefaultInRule implements IInRule {
  public static create(): DefaultInRule {
    return new DefaultInRule();
  }

  public pass(): boolean {
    return true;
  }
}
