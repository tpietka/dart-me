import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: import("../pages/StartPage.vue"),
  },
  {
    path: "/setup",
    name: "Setup",
    redirect: { name: "SetupGameType" },
    component: import("../components/layouts/SetupLayout.vue"),
    children: [
      {
        path: "/game-type",
        name: "SetupGameType",
        component: import("../pages/SelectGameType.vue"),
      },
      {
        path: "/select-players-number",
        name: "SetupPlayersNumber",
        component: import("../pages/SelectNumberOfPlayers.vue"),
      },
      {
        path: "/add-players",
        name: "SetupAddPlayers",
        component: import("../pages/AddPlayers.vue"),
      },
    ],
  },
];
export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
