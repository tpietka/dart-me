<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSetupStore } from "../stores/setup";
import BaseOption from "../components/common/BaseOption.vue";

const { setGameType } = useSetupStore();
const router = useRouter();
type GameType = "301" | "501" | "Practice";
const selectGameType = (gameType: GameType) => {
  setGameType(gameType);
  const route =
    gameType === "Practice" ? "SetupPlayersNumber" : "SetupGameRules";
  router.push({ name: route });
};
</script>

<template>
  <div class="flex flex-col gap-6 items-center">
    <base-option @click="selectGameType('301')">301</base-option>
    <base-option @click="selectGameType('501')">501</base-option>
    <base-option @click="selectGameType('Practice')">Practice</base-option>
  </div>
</template>
