<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { onBeforeMount, toRefs } from 'vue';
  import { useGameStore } from '../stores/game';
  import BaseButton from '../components/common/BaseButton.vue';

  const {currentPlayer} = toRefs(useGameStore()); 
  const {startRoundForPlayer} = useGameStore(); 
  const router = useRouter();
  const nextPlayer = () => {
    startRoundForPlayer();
    router.push({name: 'AddThrowPoints'});
  }

  onBeforeMount(() => {
    console.log(currentPlayer.value);
    if (currentPlayer.value?.hasWon()) {
      router.push({name: 'WinnerDetails'});
    }
  });
</script>

<template>
  <div>
    {{ `Player: ${currentPlayer?.getName()}` }} -  {{ `Poinst scored: ${currentPlayer?.getActiveRound()?.getScoredPoints()}` }}
    </div><div>
    {{ `Poinst left: ${currentPlayer?.getActiveRound()?.getPointsLeft()}` }}
  </div>
  <!-- TODO: Add dart board svg with highlighted hit segments -->

  <!-- TODO: Add option to edit throws -->
  <base-button @click="nextPlayer">Next player</base-button>
</template>