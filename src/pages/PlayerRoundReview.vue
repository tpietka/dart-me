<script setup lang="ts">
import { useRouter } from "vue-router";
import { toRefs } from "vue";
import { useGameStore } from "../stores/game";
import BaseButton from "../components/common/BaseButton.vue";
import DartBoard from "../components/DartBoard.vue";

const { currentPlayer } = toRefs(useGameStore());
const { startRoundForPlayer } = useGameStore();
const router = useRouter();
const nextPlayer = () => {
  startRoundForPlayer();
  router.push({ name: "AddThrowPoints" });
};
</script>

<template>
  <dart-board :points="currentPlayer?.throwsPoints"></dart-board>
  <div class="flex justify-between mb-6 mt-12">
    <div>
      <div class="text-sm">Player</div>
      <div class="text-3xl">
        {{ currentPlayer?.playerName }}
      </div>
    </div>
    <div>
      <div class="text-sm">Poinst left</div>
      <div class="text-3xl">
        {{ currentPlayer?.pointsLeft.value }}
      </div>
    </div>
  </div>
  <div>
    <div class="text-sm">Poinst scored</div>
    <div class="text-3xl">
      {{ currentPlayer?.scoredPoints.value }}
    </div>
  </div>
  <!-- TODO: Add dart board svg with highlighted hit segments -->

  <!-- TODO: Add option to edit throws -->
  <base-button class="mt-12" @click="nextPlayer">Next player</base-button>
</template>
