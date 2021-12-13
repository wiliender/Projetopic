import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import {routes} from './routes';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({ 
  routes,
  mode:"history" });//criando instancia de rotas

new Vue({
  el: '#app',
  router,//para que seja acessivel em todos os lugares da aplicação
  render: h => h(App)
})