<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSetupStore } from "../stores/setup";
import BaseOption from "../components/common/BaseOption.vue";
import { toRefs } from "vue";

const { setGameType } = useSetupStore();
const { doubleIn } = toRefs(useSetupStore());
const router = useRouter();
type GameType = "301" | "501" | "practice";
const selectGameType = (gameType: GameType) => {
  setGameType(gameType);
  router.push({ name: "SetupPlayersNumber" });
};
</script>

<template>
  <div class="flex flex-col gap-6 items-center">
    <base-option @click="selectGameType('301')">301</base-option>
    <base-option @click="selectGameType('501')">501</base-option>
    <base-option @click="selectGameType('practice')">Practice</base-option>
  </div>
  <div class="flex gap-2 justify-center items-center align-center mt-6">
    <input v-model="doubleIn" type="checkbox" name="double-in" />
    <label for="double-in">Double-in</label>
  </div>
</template>
