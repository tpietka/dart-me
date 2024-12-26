<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSetupStore } from '../stores/setup';
import { ref } from 'vue';

  const store = useSetupStore(); 
  const router = useRouter();
  const players = ref<string[]>([]);
  const setPlayersNames = () => {
    players.value.forEach(player => {
      store.addPlayers(player);
    })
    router.push({name: 'StartGame'});
  }
</script>

<template>
  {{ players }}
  {{ store.players }}
  <div>  
    <input v-for="n in store.playersCount" :key="n" v-model="players[n]" /> 
    <button @click="setPlayersNames()">Next</button>
  </div>
</template>