<script setup lang="ts">
import BaseButton from "../components/common/BaseButton.vue";
</script>

<template>
  <h1 class="text-6xl">Dart Me!</h1>

  <base-button class="mt-24" @click="$router.push({ name: 'SetupGameType' })"
    >Let's go</base-button
  >
</template>
