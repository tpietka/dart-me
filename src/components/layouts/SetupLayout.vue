<script setup lang="ts">
  import { toRefs } from "vue";
import { useSetupStore } from "../../stores/setup";
  const { gameType } = toRefs(useSetupStore());
</script>

<template>
  {{ gameType }}
  {{ $route.meta.title }}
  <router-view/>
</template>