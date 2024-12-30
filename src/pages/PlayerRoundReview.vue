<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';

  const {currentPlayer, getLastRound, startRoundForPlayer} = useGameStore(); 
  const router = useRouter();
  const nextPlayer = () => {
    startRoundForPlayer();
    router.push({name: 'AddThrowPoints'});
  }
</script>

<template>
  <div>
    {{ `Player: ${currentPlayer?.name}` }} -  {{ `Poinst scored: ${getLastRound()?.pointsScored}` }}
    </div><div>
    {{ `Poinst left: ${getLastRound()?.pointsLeft}` }}
  </div>
  <button @click="nextPlayer">Next player</button>
</template>