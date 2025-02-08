<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSetupStore } from "../stores/setup";
import BaseOption from "../components/common/BaseOption.vue";

const store = useSetupStore();
const router = useRouter();
type NumberofPlayers = 1 | 2 | 3 | 4;
const selectPlayersCount = (playersCount: NumberofPlayers) => {
  store.setPlayersCount(playersCount);
  router.push({ name: "SetupAddPlayers" });
};
</script>

<template>
  <div class="flex flex-col gap-6 items-center">
    <base-option @click="selectPlayersCount(1)">1</base-option>
    <base-option @click="selectPlayersCount(2)">2</base-option>
    <base-option @click="selectPlayersCount(3)">3</base-option>
    <base-option @click="selectPlayersCount(4)">4</base-option>
  </div>
</template>
