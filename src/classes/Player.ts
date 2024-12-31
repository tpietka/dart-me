import { Round } from "./Round";

export interface IPlayer {
  getName(): string;
  hasWon(): boolean;
  addRound(round: Round): void;
  getActiveRound(): Round | null;
  hasCompletedActiveRound(round: number): boolean;
}

export class Player implements IPlayer {
  private name: string;
  private rounds: Round[] = [];

  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
  hasWon() {
    return this.rounds.some((round) => round.getPointsLeft() === 0);
  }
  addRound(round: Round) {
    this.rounds.push(round);
  }
  getActiveRound() {
    return this.rounds[this.rounds.length - 1];
  }
  hasCompletedActiveRound(round: number) {
    return (
      this.rounds
        .find((x) => x.getRoundNumber() == round)
        ?.isRoundCompleted() ?? false
    );
  }
}
