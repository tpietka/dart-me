<script setup lang="ts">
import BaseButton from '../components/common/BaseButton.vue';
</script>

<template>
  <h1 class="text-4xl">
    Dart Me!
  </h1>

  <base-button class="mt-10" @click="$router.push({name: 'Setup'})">I'm in</base-button>
</template>