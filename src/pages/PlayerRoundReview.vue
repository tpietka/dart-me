<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';

  const store = useGameStore(); 
  const router = useRouter();
  const nextPlayer = () => {
    store.startRoundForPlayer();
    router.push({name: 'AddThrowPoints'});
  }
</script>

<template>
    {{ store.currentPlayer?.name }} - {{ store.getLastRound()?.pointsLeft }}
  <button @click="nextPlayer">Next player</button>
</template>