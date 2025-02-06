<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";
import { onBeforeMount, toRefs } from "vue";
import { useSetupStore } from "../stores/setup";
import BaseButton from "../components/common/BaseButton.vue";

const { players, gameType } = useSetupStore();
const { createGame } = useGameStore();
const { game, startingPoints } = toRefs(useGameStore());
const router = useRouter();

onBeforeMount(() => {
  createGame(players, gameType ?? "practice");
});

const startGame = () => {
  game.value?.startRoundForPlayer();
  router.push({ name: "AddThrowPoints" });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-evenly">
      <div>
        <div class="text-3xl mb-2">Points</div>
        <div class="text-xl">{{ startingPoints.value }}</div>
      </div>
      <div>
        <div class="text-3xl mb-2">Players</div>
        <div class="flex flex-col gap-2">
          <div v-for="playerName in game?.getPlayersNames()" :key="playerName">
            <span class="text-xl">{{ playerName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div class="text-3xl mb-2">Rules</div>
        <div class="flex flex-col gap-2">
          <div>Each player starts with a score of 501 points.</div>
          <div>Players take turns throwing three darts each.</div>
          <div>
            To win, players must reach exactly zero, and the final dart must
            land in a double or the bullseye.
          </div>
          <div>
            If a player exceeds zero or fails to finish on a double, their score
            remains the same as it was before that turn.
          </div>
          <div>
            The first player to throw is usually decided by a coin toss or by
            each player throwing one dart, with the closest to the bullseye
            going first.
          </div>
        </div>
      </div>
    </div>
  </div>
  <base-button class="mt-8" @click="startGame()">Next</base-button>
</template>
