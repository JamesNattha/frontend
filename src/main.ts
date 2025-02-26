import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";
import "./assets/tailwind.css";

createApp(App).use(store).use(router).use(Antd).mount("#app");
