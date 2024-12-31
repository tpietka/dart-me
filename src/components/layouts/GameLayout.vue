<script setup lang="ts">
  import { toRefs } from "vue";
import { useGameStore } from "../../stores/game";
  const {game} = toRefs(useGameStore());
</script>

<template>
  {{ game?.gameType }}
  {{ $route.meta.title }}
  <router-view/>
</template>