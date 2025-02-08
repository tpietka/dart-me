<script setup lang="ts">
defineProps<{ pointsLeft: number }>();
</script>
<template>
  <div>
    <div class="text-sm">Poinst left</div>
    <div class="text-2xl font-medium">
      {{ pointsLeft > 501 ? "-" : pointsLeft }}
    </div>
  </div>
</template>
