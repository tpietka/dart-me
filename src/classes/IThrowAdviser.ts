import { IDartThrow } from "./DartThrow";

export interface IThrowAdviser {
    suggest(pointsLeft: number, dartsLeft?: number): IDartThrow;
}
