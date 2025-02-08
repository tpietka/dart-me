<script setup lang="ts">
import { IDartThrow } from "../classes/DartThrow";

const props = defineProps<{
  dartThrows: IDartThrow[];
}>();
</script>

<template>
  <div class="flex flex-col gap-1 mt-2" v-if="dartThrows.length > 0">
    <div v-for="(dartThrow, index) in dartThrows" :key="index">
      {{
        `${dartThrow?.points ?? ""} x ${
          dartThrow?.multiplier ?? ""
        } = ${dartThrow.getScore()}`
      }}
    </div>
  </div>
</template>
<style></style>
