<script setup lang="ts">
  import { useSetupStore } from "../../stores/setup";
  const store = useSetupStore();
</script>

<template>
  {{store.gameType}}
  {{ $route.meta.title }}
  <router-view/>
</template>