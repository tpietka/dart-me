import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Layout",
    component: async () => await import("../components/layouts/Layout.vue"),
    redirect: "Home",
    children: [
      {
        path: "/",
        name: "Home",
        component: async () => await import("../pages/StartPage.vue"),
      },
      {
        path: "/game-type",
        name: "SetupGameType",
        component: async () => await import("../pages/SelectGameType.vue"),
        meta: {
          title: "Select Game Type",
        },
      },
      {
        path: "/select-players-number",
        name: "SetupPlayersNumber",
        component: async () =>
          await import("../pages/SelectNumberOfPlayers.vue"),
        meta: {
          title: "Select Number of Players",
        },
      },
      {
        path: "/add-players",
        name: "SetupAddPlayers",
        component: async () => await import("../pages/AddPlayers.vue"),
        meta: {
          title: "Add Players",
        },
      },
      {
        path: "/game",
        name: "GameDetails",
        component: async () => await import("../pages/GameDetails.vue"),
        meta: {
          title: "Game details",
        },
      },
      {
        path: "winner",
        name: "WinnerDetails",
        component: async () => await import("../pages/WinnerDetails.vue"),
        meta: {
          title: "Winner",
        },
      },
      {
        path: "/player-round-summary",
        name: "PlayerRound",
        component: async () => await import("../pages/PlayerRound.vue"),
        children: [
          {
            path: "/round-review",
            name: "PlayerRoundReview",
            component: async () =>
              await import("../pages/PlayerRoundReview.vue"),
            meta: {
              title: "",
            },
          },
          {
            path: "/select-points",
            name: "AddThrowPoints",
            component: async () =>
              await import("../pages/SelectThrowPoints.vue"),
            meta: {
              title: "",
            },
          },
        ],
      },
    ],
  },
];
export const router = createRouter({
  history: createWebHistory("/dart/"),
  routes,
});
