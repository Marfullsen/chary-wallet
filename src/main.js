import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const balance = localStorage.getItem('balance') ? Number(localStorage.getItem('balance')) : 0;

app.config.globalProperties.$balanceGlobal = ref(balance);
app.config.globalProperties.$amount = ref(0);

app.use(router).mount('#app');
