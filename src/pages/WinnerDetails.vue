<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";
import Trophy from "../components/Trophy.vue";
import BaseButton from "../components/common/BaseButton.vue";
import { IPlayer } from "../classes/Player";
const { getWinner, removeGame } = useGameStore();
const router = useRouter();

onBeforeMount(() => {
  winner.value = getWinner();
});
const winner = ref<IPlayer | null>(null);

const endGame = () => {
  removeGame();
  router.push({ name: "SetupGameType" });
};
</script>

<template>
  <div>
    <trophy class="my-8"></trophy>
    <div class="text-3xl font-bold">{{ winner?.getName() }}</div>
  </div>
  <base-button class="mt-8" @click="endGame()">New game</base-button>
</template>
