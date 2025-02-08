import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import "./index.css"; // Import Tailwind CSS
import { GameNotStartedException } from "./exceptions/GameNotStartedException";

const app = createApp(App);

app.config.errorHandler = (err) => {
  if (err instanceof GameNotStartedException) {
    alert("The game has not started yet. Please start the game first.");
    router.push({ name: "Home" });
  } else {
    console.error(err);
  }
};

const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount("#app");
