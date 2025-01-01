<script setup lang="ts">
  import { toRefs } from "vue";
  import { useSetupStore } from "../../stores/setup";
  import ContentContainer from "../common/ContentContainer.vue";
  const { gameType } = toRefs(useSetupStore());
</script>

<template>
  <div v-if="gameType">
  {{ `Selected game type: ${gameType}` }}

  </div>
  <h1 class="text-2xl">
    {{ $route.meta.title }}
  </h1>
  <content-container>
    <router-view/>
  </content-container>
</template>