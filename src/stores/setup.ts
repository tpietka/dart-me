import { defineStore } from "pinia";
export type GameType = "301" | "501" | "practice";
export interface Player {
  name: string;
}

interface SetupState {
  gameType: GameType | null;
  playersCount: number;
  players: string[];
}
export const useSetupStore = defineStore("setup", {
  state: (): SetupState => ({
    gameType: null,
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
