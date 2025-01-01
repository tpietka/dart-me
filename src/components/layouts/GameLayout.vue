<script setup lang="ts">
  import { toRefs } from "vue";
import { useGameStore } from "../../stores/game";
import ContentContainer from "../common/ContentContainer.vue";
  const {game} = toRefs(useGameStore());
</script>

<template>
  <div class="flex justify-between items-center">
    <span @click="$router.push({name: 'Home'})">Home</span>
    <span>
      {{ game?.gameType }}
    </span>
  </div>
  <h1 class="text-2xl mt-4">
    {{ $route.meta.title }}
  </h1>
  <content-container>
    <router-view/>
  </content-container>
</template>