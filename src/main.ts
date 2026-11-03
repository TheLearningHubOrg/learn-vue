import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style.css';

const app = createApp(App);

app.use(createPinia());

app.config.errorHandler = (err, _instance, info) => {
  // One place to forward render and lifecycle errors to monitoring.
  console.error(`[vue] ${info}:`, err);
};

app.mount('#app');
