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
        meta: {
          title: "Select Game Type",
        },
      },
      {
        path: "/select-players-number",
        name: "SetupPlayersNumber",
        component: import("../pages/SelectNumberOfPlayers.vue"),
        meta: {
          title: "Select Number of Players",
        },
      },
      {
        path: "/add-players",
        name: "SetupAddPlayers",
        component: import("../pages/AddPlayers.vue"),
        meta: {
          title: "Add Players",
        },
      },
    ],
  },
  {
    path: "/game",
    name: "StartGame",
    redirect: { name: "GameDetails" },
    component: import("../components/layouts/GameLayout.vue"),
    children: [
      {
        path: "",
        name: "GameDetails",
        component: import("../pages/GameDetails.vue"),
        meta: {
          title: "Game details",
        },
      },
      {
        path: "/round-summary",
        name: "RoundSummary",
        component: import("../pages/RoundSummary.vue"),
        meta: {
          title: "Round summary",
        },
      },
      {
        path: "/player-round-summary",
        name: "PlayerRound",
        component: import("../pages/PlayerRound.vue"),
        children: [
          {
            path: "/round-review",
            name: "PlayerRoundReview",
            component: import("../pages/PlayerRoundReview.vue"),
            meta: {
              title: "Player round review",
            },
          },
          {
            path: "/select-points",
            name: "AddThrowPoints",
            component: import("../pages/SelectThrowPoints.vue"),
            meta: {
              title: "Select points",
            },
          },
        ],
      },
    ],
  },
];
export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
