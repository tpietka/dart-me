<script setup lang="ts">
import { toRefs } from "vue";
import { useGameStore } from "../../stores/game";
import { useRouter } from "vue-router";
import ContentContainer from "../common/ContentContainer.vue";
const router = useRouter();
const { removeGame } = useGameStore();
const { startingPoints } = toRefs(useGameStore());
const navigateHome = () => {
  if (confirm("Are you sure you want to leave the game?")) {
    removeGame();
    router.push({ name: "Home" });
  }
};
</script>

<template>
  <div class="flex justify-between items-center">
    <span @click="navigateHome">Home</span>
    <span>
      {{ startingPoints.value }}
    </span>
  </div>
  <h1 class="text-2xl mt-4">
    {{ $route.meta.title }}
  </h1>
  <content-container>
    <router-view />
  </content-container>
</template>
