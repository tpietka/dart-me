<script setup lang="ts">
import { useRouter } from "vue-router";
import { toRefs } from "vue";
import { useGameStore } from "../stores/game";
import BaseButton from "../components/common/BaseButton.vue";
import DartBoard from "../components/DartBoard.vue";
import RoundThrows from "../components/RoundThrows.vue";

const { currentPlayer } = toRefs(useGameStore());
const { startRoundForPlayer } = useGameStore();
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
    <div>
      <div class="text-sm">Poinst scored</div>
      <div class="text-3xl">
        {{ currentPlayer?.scoredPoints.value }}
      </div>
    </div>
    <div>
      <div class="text-sm">Poinst left</div>
      <div class="text-3xl">
        {{ currentPlayer?.pointsLeft.value }}
      </div>
    </div>
  </div>

  <base-button class="mt-6" @click="nextPlayer">Next</base-button>
</template>
