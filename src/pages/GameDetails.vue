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
  <div>Players</div>
  <div class="flex flex-col gap-2">
    <div v-for="playerName in game?.getPlayersNames()" :key="playerName">
      <span>{{ playerName }} - {{ startingPoints.value }}</span>
    </div>
  </div>
  <base-button class="mt-4" @click="startGame()">Next</base-button>
</template>
