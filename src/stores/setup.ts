import { defineStore } from "pinia";
export type GameType = "301" | "501" | "practice";
export interface Player {
  name: string;
}

interface SetupState {
  gameType: GameType;
  playersCount: number;
  players: string[];
}
export const useSetupStore = defineStore("setup", {
  state: (): SetupState => ({
    gameType: "501",
    playersCount: 1,
    players: [],
  }),
  actions: {
    setGameType(type: GameType) {
      this.gameType = type;
    },
    setPlayersCount(count: number) {
      this.playersCount = count;
    },
    addPlayers(name: string) {
      this.players.push(name);
    },
  },
});
