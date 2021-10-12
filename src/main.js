import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$balanceGlobal = ref('0');

app.use(router).mount('#app');
