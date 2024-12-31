<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';
import { DartThrow, IDartThrow } from '../classes/DartThrow';
import { ref, toRefs } from 'vue';
import ThrowPoints from '../components/ThrowPoints.vue';
import ThrowMultiplier from '../components/ThrowMultiplier.vue';

  const {currentPlayer, round, pointsLeft} = toRefs(useGameStore()); 
  const {addDartThrow} = useGameStore();
  const router = useRouter();
  const throwNumber = ref(1);
  const dartThrow = ref<IDartThrow>(new DartThrow(throwNumber.value));

  const setPoints = (points: number): void => {
    dartThrow.value.setPoints(points);
  }
  const setMultiplier = (multiplier: number): void => {
    dartThrow.value.setMultiplier(multiplier);
  }
  const saveThrow = () => {
    addDartThrow(dartThrow.value);
    throwNumber.value++;
    if(throwNumber.value > 3) {
      return router.push({name: 'PlayerRoundReview'});
    }
    return router.push({name: 'AddThrowPoints'});
  }
</script>
<template>
  <div>
    {{ `Player: ${currentPlayer?.getName()}` }} {{ `Points left: ${pointsLeft}` }}
  </div>
  <h1>{{`Round ${round}` }} - {{ `Throw ${throwNumber}/3` }}</h1>
  <div style="display: flex; flex-wrap: wrap;">
    <throw-points @click="setPoints(n)" v-for="n in 20" :key="n">{{ n }}</throw-points>
    <throw-points @click="setPoints(25)">25</throw-points>
    <throw-points @click="setPoints(50)">50</throw-points>
  </div> 
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <throw-multiplier @click="setMultiplier(1)">Single</throw-multiplier>
    <throw-multiplier @click="setMultiplier(2)">Double</throw-multiplier>
    <throw-multiplier @click="setMultiplier(3)">Triple</throw-multiplier>
  </div> 

  {{ dartThrow.getScore() }}
  <button @click="saveThrow()">Save</button>
</template>