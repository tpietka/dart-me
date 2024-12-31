<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';
import { onBeforeMount } from 'vue';
import { useSetupStore } from '../stores/setup';
  const setupStore = useSetupStore();
  const {game, createGame} = useGameStore(); 
  const router = useRouter();

  onBeforeMount(() => {
    createGame(setupStore.players, setupStore.gameType);
  })

  const startGame = () => {
    game?.startRoundForPlayer();
    router.push({name: 'AddThrowPoints'});
  }
</script>

<template>
  <div v-for="playerName in game?.getPlayersNames()" :key="playerName">
    {{ playerName }} - {{ game?.startingPoints }}
  </div>
  <button @click="startGame()">Next</button>
</template>