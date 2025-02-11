import { defineStore } from "pinia";
import { GameTypes } from "../classes/GameType";

interface SetupState {
  gameType: GameTypes;
  playersCount: number;
  players: string[];
  doubleIn: boolean;
  doubleOut: boolean;
}
export const useSetupStore = defineStore("setup", {
  state: (): SetupState => ({
    gameType: "Practice",
    playersCount: 1,
    players: [],
    doubleIn: false,
    doubleOut: true,
  }),
  actions: {
    setGameType(type: GameTypes) {
      this.gameType = type;
    },
    setPlayersCount(count: number) {
      this.playersCount = count;
    },
    addPlayers(playersNames: string[], randomOrder: boolean) {
      if (playersNames.length === 0) {
        for (let i = 1; i <= this.playersCount; i++) {
          playersNames.push(`Player ${i}`);
        }
      }
      this.players = [];
      playersNames.forEach((name) => {
        this.players.push(name);
      });
      if (randomOrder) {
        this.shufflePlayers();
      }
    },
    shufflePlayers() {
      for (let i = this.players.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
      }
    },
  },
});
