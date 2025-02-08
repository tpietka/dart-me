<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSetupStore } from "../stores/setup";
import BaseOption from "../components/common/BaseOption.vue";

const store = useSetupStore();
const router = useRouter();
type GameType = "301" | "501" | "practice";
const selectGameType = (gameType: GameType) => {
  store.setGameType(gameType);
  router.push({ name: "SetupPlayersNumber" });
};
</script>

<template>
  <h1 class="text-2xl mb-6">
    {{ $route.meta.title }}
  </h1>
  <div class="flex flex-col gap-6 items-center">
    <base-option @click="selectGameType('301')">301</base-option>
    <base-option @click="selectGameType('501')">501</base-option>
    <base-option @click="selectGameType('practice')">Practice</base-option>
  </div>
</template>
