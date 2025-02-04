<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';
import { DartThrow, IDartThrow } from '../classes/DartThrow';
import { computed, ref, toRefs } from 'vue';
import BaseButton from '../components/common/BaseButton.vue';
import ThrowPoints from '../components/ThrowPoints.vue';
import ThrowMultiplier from '../components/ThrowMultiplier.vue';

  const {currentPlayer, round, pointsLeft, throwNumber} = toRefs(useGameStore()); 
  const {addDartThrow} = useGameStore();
  const router = useRouter();
  const currentThrow = computed(() => throwNumber.value);
  const dartThrow = ref<IDartThrow>(new DartThrow());
  const dartPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50];
  const setPoints = (points: number): void => {
    dartThrow.value.setPoints(points);
  }
  const setMultiplier = (multiplier: number): void => {
    dartThrow.value.setMultiplier(multiplier);
  }
  const createNextThrow = (): void => {
    dartThrow.value = new DartThrow();
  }
  const saveThrow = () => {
    const result = addDartThrow(dartThrow.value);

    if(result.route) {
      return router.push({name: result.route});
    }
    createNextThrow();  
  }

  const score = computed(() => {
    return dartThrow.value.getScore();
  });
</script>
<template>
  <div class="flex justify-between mb-4">
    <div>
      <div class="text-sm">
        Now throwing
      </div>
      <div class="text-2xl">
        {{ currentPlayer?.getName() }}  

      </div>
    </div>
    <div>
      <div class="text-sm">
        Points left
      </div>
      <div class="text-2xl">
        {{ pointsLeft }}  

      </div>
    </div>
  </div>
  <div class="text-md">
    {{`Round ${round}` }}
  </div>
  <div class="mt-2 text-2xl">
    {{ `Throw ${currentThrow}/3` }}
  </div>
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