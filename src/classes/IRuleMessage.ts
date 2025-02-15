import { RuleMessages } from "./rules/RuleMessages";

export interface IRuleMessage {
  getMessage(): RuleMessages;
}
