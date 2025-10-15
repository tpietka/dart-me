import { DartThrow, IDartThrow } from "../DartThrow";
import { IThrowAdviser } from "../IThrowAdviser";

export class DisabledThrowAdviser implements IThrowAdviser {
    public static create(): DisabledThrowAdviser {
        return new DisabledThrowAdviser();
    }

    suggest(pointsLeft: number, dartsLeft: number = 3): IDartThrow {
        return DartThrow.empty();
    }
}