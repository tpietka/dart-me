<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/game';
import { DartThrow } from '../classes/DartThrow';
import { ref } from 'vue';

  const store = useGameStore(); 
  const router = useRouter();
  const throwNumber = ref(1);
  const dartThrow = ref<DartThrow>(new DartThrow(throwNumber.value));
    console.log(store.currentPlayer);

  const setPoints = (points: number) => {
    dartThrow.value.setPoints(points);
  }
  const setMultiplier = (multiplier: number) => {
    dartThrow.value.setMultiplier(multiplier);
  }
  const saveThrow = () => {
    store.addDartThrow(dartThrow.value);
    throwNumber.value++;
    if(throwNumber.value > 3) {
      return router.push({name: 'PlayerRoundReview'});
    }
    return router.push({name: 'AddThrowPoints'});
  }
</script>
<template>
  {{ store.currentPlayer }}
  <h1>{{`Round ${store.round}` }} - {{ `${throwNumber}/3` }} - {{ store.currentPlayer?.name }}</h1>
  <div class="flex">
    <div @click="setPoints(n)" v-for="n in 20" :key="n">{{ n }}</div>
    <div @click="setPoints(25)">25</div>
    <div @click="setPoints(50)">50</div>
  </div> 
  <div class="flex">
    <div @click="setMultiplier(1)">Single</div>
    <div @click="setMultiplier(2)">Double</div>
    <div @click="setMultiplier(3)">Triple</div>
  </div> 

  {{ dartThrow.points }} - {{ dartThrow.multiplier }}
  <button @click="saveThrow()">Save</button>
</template>