import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import messagePlugin from '@/utils/message.plugin';
import Loader from './components/app/Loader.vue';
import 'materialize-css/dist/js/materialize.min';
import dateFilter from '@/filters/date.filter';
import currencyFilter from './filters/currency.filter';

Vue.config.productionTip = false;

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);

Vue.use(Vuelidate);
Vue.use(messagePlugin);

Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: 'AIzaSyDVRy4Hnw9UWsussg7HWrWM5s3gE6IvEGE',
  authDomain: 'my-crm-2019.firebaseapp.com',
  databaseURL: 'https://my-crm-2019.firebaseio.com',
  projectId: 'my-crm-2019',
  storageBucket: 'my-crm-2019.appspot.com',
  messagingSenderId: '394871385270',
  appId: '1:394871385270:web:91bb0c5fb37beed9c3ca17',
  measurementId: 'G-VKSSCS2KDK',
});

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
