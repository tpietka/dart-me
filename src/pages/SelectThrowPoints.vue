<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';
import { DartThrow, IDartThrow } from '../classes/DartThrow';
import { computed, ref, toRefs } from 'vue';
import BaseButton from '../components/common/BaseButton.vue';
import ThrowPoints from '../components/ThrowPoints.vue';
import ThrowMultiplier from '../components/ThrowMultiplier.vue';

  const {currentPlayer, round, pointsLeft, game} = toRefs(useGameStore()); 
  const {addDartThrow} = useGameStore();
  const router = useRouter();
  const throwNumber = ref(1);
  const dartThrow = ref<IDartThrow>(new DartThrow(throwNumber.value));
  const dartPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50];
  const setPoints = (points: number): void => {
    if(points === 25 || points === 50) {
      dartThrow.value.setMultiplier(1);
    }
    dartThrow.value.setPoints(points);
  }
  const setMultiplier = (multiplier: number): void => {
    if(dartThrow.value.points === 25 || dartThrow.value.points === 50) {
      dartThrow.value.setMultiplier(1);
      return;
    }
    dartThrow.value.setMultiplier(multiplier);
  }
  const saveThrow = () => {
    addDartThrow(dartThrow.value);
    if(game.value?.isGameFinished()) {
      return router.push({name: 'WinnerDetails'});
    }
    throwNumber.value++;
    if(throwNumber.value > 3) {
      return router.push({name: 'PlayerRoundReview'});
    }
    dartThrow.value = new DartThrow(throwNumber.value);  
  }

  const score = computed(() => {
    return dartThrow.value.getScore();
  });
</script>
<template>
  <div>
    {{ `Player: ${currentPlayer?.getName()}` }} {{ `Points left: ${pointsLeft}` }}
  </div>
  <h1>{{`Round ${round}` }} - {{ `Throw ${throwNumber}/3` }}</h1>
  <div class="flex flex-wrap justify-center gap-2 mt-4">
    <throw-points v-for="point in dartPoints" :key="point" :class="[{'bg-red-800': point === dartThrow.points}]" @click="setPoints(point)">{{ point }}</throw-points>
  </div> 
  <div class="flex flex-wrap justify-center gap-2 mt-4">
    <throw-multiplier :class="[{'bg-red-800': 1 === dartThrow.multiplier}]" @click="setMultiplier(1)">Single</throw-multiplier>
    <throw-multiplier v-if="dartThrow.points <= 20" :class="[{'bg-red-800': 2 === dartThrow.multiplier}]" @click="setMultiplier(2)">Double</throw-multiplier>
    <throw-multiplier v-if="dartThrow.points <= 20" :class="[{'bg-red-800': 3 === dartThrow.multiplier}]" @click="setMultiplier(3)">Triple</throw-multiplier>
  </div> 
<div class="my-4">

  {{ `Scored points: ${score}` }}
</div>
  <base-button @click="saveThrow()">Save</base-button>
</template>