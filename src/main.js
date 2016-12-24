import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './app.vue';
import login from './pages/login';
import test1 from './pages/test1';
import test2 from './pages/test2';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../static/css/styles.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min'
const routes = [
    {
        path:'/main',
        component:App,
        children: [
            {
                path: 'test1',
                component: test1
            },
            {
                path: 'test2',
                component: test2
            }
        ]
    },
    {
        path:'/login',
        component:login
    },
    {
        path:'*',
        component:login
    }
];

const router = new VueRouter({
    routes
});

const  vue=new Vue({
    router
}).$mount('#app');
