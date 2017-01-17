import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../static/css/styles.css';
import '../node_modules/alertifyjs/build/css/alertify.min.css';
import '../node_modules/alertifyjs/build/css/themes/bootstrap.min.css';
import '../node_modules/bootstrap-table/dist/bootstrap-table.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import '../node_modules/bootstrap-table/dist/bootstrap-table.min';
import '../static/js/bootstrap-table-toolbar';
import '../static/js/table-locale';
import './common';

import filters from './filters';
import components from './components';
import App from './app.vue';
import login from './pages/login';
import home from './pages/home';
import users from './pages/users';
import roles from './pages/roles';
import permissions from './pages/permissions';
import goHome from './pages/goHome.vue';
import sendInfo from './pages/customers/sendInfo.vue';
import deliveryManInfo from './pages/customers/deliveryManInfo.vue';
import personalInfo from './pages/customers/personalInfo.vue';
import orders from './pages/orders';
import accounts from './pages/accounts';

Vue.use(VueRouter);
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
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
                path: 'main/users',
                component: users,
            },
            {
                path: 'main/roles',
                component: roles
            },
            {
                path: 'main/permissions',
                component: permissions
            },
            {
                path: 'main/customers/sendInfo',
                component: sendInfo
            },
            {
                path: 'main/customers/deliveryManInfo',
                component: deliveryManInfo
            },
            {
                path: 'main/customers/personalInfo',
                component: personalInfo
            },
            {
                path: 'main/orders',
                component: orders
            },
            {
                path: 'main/orders/:orderNum',
                component: orders
            },
            {
                path: 'main/accounts',
                component: accounts
            },
            {
                path: 'main/accounts/:orderNum',
                component: accounts
            },

        ]
    },
    {
        path:'/goHome',
        component:goHome
    },
    {
        path:'/login',
        meta: { auth: false },
        component:login
    }
];

const router = new VueRouter({
    routes
});
router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta;
    var isLogin = Boolean(store.state.user.name) //true用户已登录， false用户未登录
    var loginReg=/^\/login/;
    
    if (auth && !isLogin && !loginReg.test(path)) {
        return next({ path: '/login' })
    }else if(loginReg.test(path) && isLogin ){
        return next({ path: '/main/home' })
    }
    next()
});
const  vue=new Vue({
    store,
    router,
    mounted(){
    }
}).$mount('#app');
