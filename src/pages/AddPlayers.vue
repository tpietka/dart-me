<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSetupStore } from "../stores/setup";
import { ref } from "vue";
import BaseButton from "../components/common/BaseButton.vue";

const store = useSetupStore();
const router = useRouter();
const players = ref<string[]>([]);
const setPlayersNames = () => {
  store.addPlayers(players.value);
  router.push({ name: "StartGame" });
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <input v-for="n in store.playersCount" :key="n" v-model="players[n]" />
  </div>
  <base-button class="mt-4" @click="setPlayersNames()">Next</base-button>
</template>
