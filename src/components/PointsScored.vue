<script setup lang="ts">
defineProps<{ pointsScored: number }>();
</script>
<template>
  <div>
    <slot><div class="text-sm">Points scored in a round</div></slot>
    <div class="text-2xl font-medium">
      {{ pointsScored }}
    </div>
  </div>
</template>
