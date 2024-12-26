<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSetupStore } from '../stores/setup';

  const store = useSetupStore(); 
  const router = useRouter();
  type NumberofPlayers = 1 | 2 | 3 | 4;
  const selectPlayersCount = (playersCount: NumberofPlayers) => {
    store.setPlayersCount(playersCount); 
    router.push({name: 'SetupAddPlayers'});
  }
</script>

<template>
  <div>  
    <button @click="selectPlayersCount(1)">1</button> 
    <button @click="selectPlayersCount(2)">2</button> 
    <button @click="selectPlayersCount(3)">3</button> 
    <button @click="selectPlayersCount(4)">4</button> 
  </div>
</template>