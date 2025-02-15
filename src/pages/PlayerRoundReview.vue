<script setup lang="ts">
import { useRouter } from "vue-router";
import { toRefs } from "vue";
import { useGameStore } from "../stores/game";
import BaseButton from "../components/common/BaseButton.vue";
import DartBoard from "../components/DartBoard.vue";
import RoundThrows from "../components/RoundThrows.vue";
import PointsLeft from "../components/PointsLeft.vue";
import PointsScored from "../components/PointsScored.vue";

const { currentPlayer } = toRefs(useGameStore());
const { startRoundForPlayer, getMessage } = useGameStore();
const router = useRouter();
const nextPlayer = () => {
  startRoundForPlayer();
  router.push({ name: "AddThrowPoints" });
};
</script>

<template>
  <h1 class="text-2xl mb-4">
    {{ `${currentPlayer?.playerName}'s round review` }}
  </h1>
  <div class="flex flex-col">
    <div class="text-3xl"></div>
  </div>
  <dart-board :points="currentPlayer?.throwPoints" />
  <round-throws :dart-throws="currentPlayer?.throwPoints" />
  <div class="flex justify-between">
    <points-scored :points-scored="currentPlayer?.scoredPoints.value" />
    <points-left :points-left="currentPlayer?.pointsLeft.value" />
  </div>
  <div class="mt-4 border border-red-500 p-2" v-if="getMessage()">
    {{ getMessage() }}
  </div>
  <base-button class="mt-6" @click="nextPlayer">Next</base-button>
</template>
