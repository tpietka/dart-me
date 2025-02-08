<script setup lang="ts">
import { toRefs } from "vue";
import { useGameStore } from "../../stores/game";
import { useRouter } from "vue-router";
import ContentContainer from "../common/ContentContainer.vue";
const router = useRouter();
const { removeGame } = useGameStore();
const { gameType } = toRefs(useGameStore());
const navigateHome = () => {
  if (confirm("Are you sure you want to leave the game?")) {
    removeGame();
    router.push({ name: "Home" });
  }
};
</script>

<template>
  <div
    class="flex justify-between items-center fixed top-0 left-0 right-0 py-4 px-8 h-[60px] bg-slate-800"
  >
    <span class="text-3xl" @click="navigateHome">Home</span>
    <span class="text-3xl">
      {{ gameType }}
    </span>
  </div>
  <h1 class="text-2xl mb-6">
    {{ $route.meta.title }}
  </h1>
  <content-container>
    <router-view />
  </content-container>
</template>
