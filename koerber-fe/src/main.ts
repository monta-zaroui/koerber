import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faSortUp, faSortDown);

const pinia = createPinia();
const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.use(pinia);
app.mount('#app');
