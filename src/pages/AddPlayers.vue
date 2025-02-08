<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSetupStore } from "../stores/setup";
import { ref } from "vue";
import BaseButton from "../components/common/BaseButton.vue";

const store = useSetupStore();
const router = useRouter();
const randomOrder = ref<boolean>(false);
const players = ref<string[]>([]);
const setPlayersNames = () => {
  store.addPlayers(players.value, randomOrder.value);
  router.push({ name: "GameDetails" });
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <input
      class="py-4 px-24 border rounded-xl bg-gray-800 text-center"
      v-for="n in store.playersCount"
      :key="n"
      v-model="players[n]"
    />
  </div>
  <div class="flex gap-2 justify-center mt-6">
    <input v-model="randomOrder" type="checkbox" name="shuffle-players-order" />
    <label for="shuffle-players-order">Random order</label>
  </div>
  <base-button class="mt-8" @click="setPlayersNames()">Next</base-button>
</template>
