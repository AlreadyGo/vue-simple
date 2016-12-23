import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './app.vue';
import test2 from './pages/test2';
import '../static/js/test';

const routes = [
    {path:'/test1',component:App},
    {path:'/test2',component:test2}
];

const router = new VueRouter({
    routes
});

const  vue=new Vue({
    router
}).$mount('#app');
