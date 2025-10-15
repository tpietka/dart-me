import { defineStore } from "pinia";
import { IDartThrow } from "../classes/DartThrow";
import { Game, NullGame } from "../classes/Game";
import { IPlayer, Player } from "../classes/Player";
import { Points } from "../classes/valueObjects/Points";
import { ThrowResult } from "../classes/ThrowResult";
import { IPlayerPoints } from "../classes/PlayerPoints";
import { IInRule } from "../classes/IInRule";
import { IOutRule } from "../classes/IOutRule";
import { GameType, GameTypes } from "../classes/GameType";
import { IThrowAdviser } from "../classes/IThrowAdviser";

interface GameState {
  game: Game | NullGame;
}
export const useGameStore = defineStore("game", {
  state: (): GameState => ({
    game: NullGame.create(Points.zero),
  }),
  getters: {
    suggestedNextThrow(): IDartThrow {
      return this.game.getCurrentPlayer()?.suggestedNextThrow;
    },
    pointsLeft(): number {
      return this.game.getCurrentPlayer()?.pointsLeft.value ?? 1;
    },
    currentPlayer(): IPlayerPoints {
      return this.game.getCurrentPlayer();
    },
    round(): number {
      return this.game.roundNumber.value;
    },
    throwNumber(): number {
      return this.game.getCurrentPlayer()?.throwNumber ?? 1;
    },
    gameTypeName(): string {
      return this.game.getGameType();
    },
  },
  actions: {
    getMessage(): string {
      return this.game.getCurrentPlayer()?.getRoundReviewMessage();
    },
    getWinner(): IPlayer | null {
      const winner = this.game?.getWinner();
      if (!winner) {
        return null;
      }
      return winner;
    },
    removeGame(): void {
      this.game = NullGame.create(Points.create(0));
    },
    createGame(
      players: string[],
      gameType: GameTypes,
      inRule: IInRule,
      outRule: IOutRule,
      dartThrowAdviser: IThrowAdviser
    ): void {
      this.game = Game.create(new GameType(gameType), inRule, outRule, dartThrowAdviser);
      this.createPlayers(players);
    },
    createPlayers(players: string[]): void {
      players.forEach((playerName) => {
        this.game.addPlayerPoints(new Player(playerName));
      });
    },
    startRoundForPlayer(): void {
      this.game.startRoundForPlayer();
    },
    addDartThrow(dartThrow: IDartThrow): ThrowResult {
      return this.game.addThrow(dartThrow);
    },
  },
});
