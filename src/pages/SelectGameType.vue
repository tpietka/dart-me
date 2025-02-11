<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSetupStore } from "../stores/setup";
import BaseOption from "../components/common/BaseOption.vue";
import { GameTypes } from "../classes/GameType";

const { setGameType } = useSetupStore();
const router = useRouter();
const selectGameType = (gameType: GameTypes) => {
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
