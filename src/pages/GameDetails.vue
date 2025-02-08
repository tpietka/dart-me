<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";
import { computed, onBeforeMount, toRefs } from "vue";
import { useSetupStore } from "../stores/setup";
import BaseButton from "../components/common/BaseButton.vue";

const { players, gameType } = useSetupStore();
const { createGame } = useGameStore();
const { game, startingPoints } = toRefs(useGameStore());
const router = useRouter();

onBeforeMount(() => {
  createGame(players, gameType ?? "practice");
});

const gameStartingPoints = computed(() => {
  if (gameType != "301" && gameType != "501") {
    return "-";
  }
  return startingPoints;
});

const startGame = () => {
  game.value?.startRoundForPlayer();
  router.push({ name: "AddThrowPoints" });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <div>
        <div class="text-xl mb-2">Points</div>
        <div class="text-2xl font-medium">{{ gameStartingPoints }}</div>
      </div>
      <div>
        <div class="text-xl mb-2">Players</div>
        <div class="flex flex-col gap-2">
          <div v-for="playerName in game?.getPlayersNames()" :key="playerName">
            <span class="text-2xl font-medium">{{ playerName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="gameType != 'practice'">
        <div class="text-3xl mb-4 mt-4">Rules</div>
        <div class="flex flex-col gap-2">
          <div>Each player starts with a score of {{ gameType }} points.</div>
          <div>Players take turns throwing three darts each.</div>
          <div>
            To win, players must reach exactly zero, and the final dart must
            land in a double or the bullseye.
          </div>
          <div>
            If a player exceeds zero or fails to finish on a double, their score
            remains the same as it was before that turn.
          </div>
        </div>
      </div>
    </div>
  </div>
  <base-button class="mt-8" @click="startGame()">Next</base-button>
</template>
