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
  <div class="flex justify-between mb-4">
    <div>
      <div class="text-sm">
        Player
      </div>
      <div class="text-2xl">
        {{ currentPlayer?.getName() }}  
      </div>
    </div>
    <div>
      <div class="text-sm">
        Poinst left
      </div>
      <div class="text-2xl">
        {{ currentPlayer?.getActiveRound()?.getPointsLeft() }}  
      </div>
    </div>
    </div>
    <div>
      <div class="text-sm">
        Poinst scored
      </div>
      <div class="text-2xl">
        {{ currentPlayer?.getActiveRound()?.getScoredPoints() }}  
      </div>
    </div>
  <!-- TODO: Add dart board svg with highlighted hit segments -->

  <!-- TODO: Add option to edit throws -->
  <base-button class="mt-4" @click="nextPlayer">Next player</base-button>
</template>