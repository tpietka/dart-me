<script setup lang="ts">
defineProps<{ playerName: string }>();
</script>
<template>
  <div>
    <div class="text-sm">Now throwing</div>
    <div class="text-2xl font-medium">
      {{ playerName }}
    </div>
  </div>
</template>
