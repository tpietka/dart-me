<script setup lang="ts">
import { toRefs } from "vue";
import { useSetupStore } from "../stores/setup";
import BaseButton from "../components/common/BaseButton.vue";
const { doubleIn, doubleOut, throwSuggestion } = toRefs(useSetupStore());
</script>

<template>
  <div class="flex gap-2 justify-center items-center align-center mt-6">
    <input v-model="doubleIn" type="checkbox" name="double-in" />
    <label for="double-in">Double-in</label>
  </div>
  <div class="flex gap-2 justify-center items-center align-center mt-6">
    <input v-model="doubleOut" type="checkbox" name="double-out" />
    <label for="double-out">Double-out</label>
  </div>
  <div class="flex gap-2 justify-center items-center align-center mt-6">
    <input v-model="throwSuggestion" type="checkbox" name="double-out" />
    <label for="double-out">Suggest next throws</label>
  </div>
  <base-button
    class="mt-8"
    @click="$router.push({ name: 'SetupPlayersNumber' })"
    >Next</base-button
  >
</template>
