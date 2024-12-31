<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';

  const {currentPlayer, startRoundForPlayer} = useGameStore(); 
  const router = useRouter();
  const nextPlayer = () => {
    startRoundForPlayer();
    router.push({name: 'AddThrowPoints'});
  }
</script>

<template>
  <div>
    {{ `Player: ${currentPlayer?.getName()}` }} -  {{ `Poinst scored: ${currentPlayer?.getActiveRound()?.getScoredPoints()}` }}
    </div><div>
    {{ `Poinst left: ${currentPlayer?.getActiveRound()?.getPointsLeft()}` }}
  </div>
  <!-- TODO: Add dart board svg with highlighted hit segments -->

  <!-- TODO: Add option to edit throws -->
  <button @click="nextPlayer">Next player</button>
</template>