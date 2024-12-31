<script setup lang="ts">
  import { toRefs } from "vue";
import { useGameStore } from "../../stores/game";
import ContentContainer from "../common/ContentContainer.vue";
  const {game} = toRefs(useGameStore());
</script>

<template>
  {{ game?.gameType }}
  {{ $route.meta.title }}
  <content-container>
    <router-view/>
  </content-container>
</template>