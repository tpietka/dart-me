<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";
import { IPlayer } from "../classes/Player";
const {getWinner, removeGame} = useGameStore();
const router = useRouter();

onBeforeMount(() => {
  winner.value = getWinner();
})
const winner = ref<IPlayer | null>(null);

const endGame = () => {
  removeGame();
  router.push({name: 'Setup'});
}
</script>

<template>
  <div>
    <!-- TODO: Add trophy svg -->
    <h2>Winner</h2>
    <p>Winner: {{ winner?.getName() }}</p>
  </div>
  <base-button @click="endGame()">New game</base-button>
</template>