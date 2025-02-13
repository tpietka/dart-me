<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGameStore } from "../stores/game";
import { onBeforeMount, toRefs } from "vue";
import { useSetupStore } from "../stores/setup";
import BaseButton from "../components/common/BaseButton.vue";
import { RulesCreator } from "../classes/rules/RulesCreator";

const { players, gameType, doubleIn, doubleOut } = toRefs(useSetupStore());
const { createGame } = useGameStore();
const { game } = toRefs(useGameStore());
const router = useRouter();

onBeforeMount(() => {
  const rules = new RulesCreator(
    gameType.value,
    doubleIn.value,
    doubleOut.value
  );
  createGame(
    players.value,
    gameType.value,
    rules.getInRule(),
    rules.getOutRule()
  );
});

const startGame = () => {
  game.value?.startRoundForPlayer();
  router.push({ name: "AddThrowPoints" });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <div>
        <div class="text-xl mb-2">Points</div>
        <div class="text-2xl font-medium">{{ game.getGameType() }}</div>
      </div>
      <div>
        <div class="text-xl mb-2">Players</div>
        <div class="flex flex-col gap-2">
          <div v-for="playerName in game?.getPlayersNames()" :key="playerName">
            <span class="text-2xl font-medium">{{ playerName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="gameType != 'Practice'">
        <div class="text-3xl mb-4 mt-4">Rules</div>
        <div class="flex flex-col gap-2">
          <div>Each player starts with a score of {{ gameType }} points.</div>
          <div>Players take turns throwing three darts each.</div>
          <div v-if="doubleIn">
            <div>
              To start scoring points, players must hit double segment with
              first dart. If they hit any other segment they have to wait for
              next round to try again.
            </div>
          </div>
          <div v-if="doubleOut">
            <div>
              To win, players must reach exactly zero, and the final dart must
              land in a double or the bullseye. If a player exceeds zero or
              fails to finish on a double, their score remains the same as it
              was before that turn.
            </div>
          </div>
          <div v-else>
            To win, players must reach exactly zero. If a player exceeds zero,
            their score remains the same as it was before that turn.
          </div>
        </div>
      </div>
    </div>
  </div>
  <base-button class="mt-8" @click="startGame()">Next</base-button>
</template>
