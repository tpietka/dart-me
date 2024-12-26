<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';
import { onBeforeMount } from 'vue';
import { useSetupStore } from '../stores/setup';
  const setupStore = useSetupStore();
  const store = useGameStore(); 
  const router = useRouter();

  onBeforeMount(() => {
    store.createGame(setupStore.players, setupStore.gameType);
  })

  const startGame = () => {
    store.startRoundForPlayer();
    router.push({name: 'AddThrowPoints'});
  }
</script>

<template>
  <div v-for="player in store.players" :key="player.name">
    {{ player.name }} - {{ store.startingPoints }}
  </div>
  <button @click="startGame()">Next</button>
</template>