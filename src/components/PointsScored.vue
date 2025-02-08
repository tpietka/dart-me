<script setup lang="ts">
defineProps<{ pointsScored: number }>();
</script>
<template>
  <div>
    <div class="text-sm">Poinst scored</div>
    <div class="text-2xl font-medium">
      {{ pointsScored }}
    </div>
  </div>
</template>
