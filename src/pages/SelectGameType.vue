<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSetupStore } from '../stores/setup';

  const store = useSetupStore(); 
  const router = useRouter();
  type GameType = '301' | '501' | 'practice';
  const selectGameType = (gameType: GameType) => {
    store.setGameType(gameType); 
    router.push({name: 'SetupPlayersNumber'});
  }
</script>

<template>
  <div>  
    <button @click="selectGameType('301')">301</button> 
    <button @click="selectGameType('501')">501</button> 
    <button @click="selectGameType('practice')">Practice</button> 
  </div>
</template>