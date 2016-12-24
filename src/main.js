import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'
Vue.use(VueRouter);

import App from './app.vue';
import login from './pages/login';
import home from './pages/home';
import test2 from './pages/test2';
import components from './components';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../static/css/styles.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min'

Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})

const routes = [
    {
        path:'/',
        component:App,
        children: [
            {
                path: 'main/home',
                component: home
            },
            {
                path: 'main/test2',
                component: test2
            }
        ]
    },
    {
        path:'/login',
        meta: { auth: false },
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
router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.user.name) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})
const  vue=new Vue({
    store,
    router
}).$mount('#app');