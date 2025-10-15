<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";
import { DartThrow, IDartThrow } from "../classes/DartThrow";
import { computed, ref, toRefs } from "vue";
import PointsScored from "../components/PointsScored.vue";
import BaseButton from "../components/common/BaseButton.vue";
import ThrowPoints from "../components/ThrowPoints.vue";
import ThrowMultiplier from "../components/ThrowMultiplier.vue";
import PointsLeft from "../components/PointsLeft.vue";
import PlayerThrowing from "../components/PlayerThrowing.vue";

const { currentPlayer, round, pointsLeft, throwNumber, suggestedNextThrow } = toRefs(
  useGameStore()
);
const { addDartThrow } = useGameStore();
const router = useRouter();
const currentThrow = computed(() => throwNumber.value);
const dartThrow = ref<IDartThrow>(DartThrow.empty());
const dartPoints = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
];
const setPoints = (points: number): void => {
  dartThrow.value.setPoints(points);
};
const setMultiplier = (multiplier: number): void => {
  dartThrow.value.setMultiplier(multiplier);
};
const createNextThrow = (): void => {
  dartThrow.value = DartThrow.empty();
};
const saveThrow = () => {
  const result = addDartThrow(dartThrow.value);

  if (result.route) {
    return router.push({ name: result.route });
  }
  createNextThrow();
};

const score = computed(() => {
  return dartThrow.value.getScore();
});
</script>
<template>
  <div class="flex justify-between items-baseline mb-4">
    <player-throwing :player-name="currentPlayer?.playerName" />
    <div>
      <div class="text-sm">
        {{ `Round ${round}` }}
      </div>
      <div class="text-xl">
        {{ `Throw ${currentThrow}/3` }}
      </div>
    </div>
    <points-left :points-left="pointsLeft" />
  </div>
  <div class="flex flex-wrap justify-center gap-1 mt-4">
    <throw-points
      v-for="point in dartPoints"
      :key="point"
      :class="[{ 'bg-red-800': point === dartThrow.points }, {'bg-orange-400': point === suggestedNextThrow.points && !suggestedNextThrow.isEmpty() }]"
      @click="setPoints(point)"
      >{{ point }}</throw-points
    >
  </div>
  <div class="flex flex-wrap justify-center gap-2 mt-4">
    <throw-multiplier
      :class="[{ 'bg-red-800': 1 === dartThrow.multiplier }, {'bg-orange-400': 1 === suggestedNextThrow.multiplier && !suggestedNextThrow.isEmpty() && suggestedNextThrow.points === dartThrow.points}]"
      @click="setMultiplier(1)"
      >Single</throw-multiplier
    >
    <throw-multiplier
      v-if="dartThrow.points <= 25 && dartThrow.points > 0"
      :class="[{ 'bg-red-800': 2 === dartThrow.multiplier }, {'bg-orange-400': 2 === suggestedNextThrow.multiplier && !suggestedNextThrow.isEmpty() && suggestedNextThrow.points === dartThrow.points}]"
      @click="setMultiplier(2)"
      >Double</throw-multiplier
    >
    <throw-multiplier
      v-if="dartThrow.points <= 20 && dartThrow.points > 0"
      :class="[{ 'bg-red-800': 3 === dartThrow.multiplier }, {'bg-orange-400': 3 === suggestedNextThrow.multiplier && !suggestedNextThrow.isEmpty() && suggestedNextThrow.points === dartThrow.points}]"
      @click="setMultiplier(3)"
      >Treble</throw-multiplier
    >
  </div>
  <div class="my-4">
    {{ `Current throw points: ${score}` }}
  </div>
  <points-scored
    class="mb-3"
    :points-scored="currentPlayer?.scoredPoints.value"
  />
  <base-button @click="saveThrow()">Save</base-button>
</template>
