<script setup lang="ts">
  import { toRefs } from "vue";
  import { useSetupStore } from "../../stores/setup";
  import ContentContainer from "../common/ContentContainer.vue";
  const { gameType } = toRefs(useSetupStore());
</script>

<template>
  {{ gameType }}
  {{ $route.meta.title }}
  <content-container>
    <router-view/>
  </content-container>
</template>