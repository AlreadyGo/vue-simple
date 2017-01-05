import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import store from './store'
Vue.use(VueRouter);
Vue.use(VueResource);
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../static/css/styles.css';
import '../node_modules/alertifyjs/build/css/alertify.min.css';
import '../node_modules/alertifyjs/build/css/themes/bootstrap.min.css';
import '../node_modules/bootstrap-table/dist/bootstrap-table.min.css';

import '../node_modules/bootstrap/dist/js/bootstrap.min';
import '../node_modules/bootstrap-table/dist/bootstrap-table.min';
import '../static/js/table-locale';
import '../static/js/common';


import favicon from '../static/pic/favicon.png';
import components from './components';
import App from './app.vue';
import login from './pages/login';
import home from './pages/home';
import users from './pages/users';
import roles from './pages/roles';
import permissions from './pages/permissions';
import goHome from './pages/goHome.vue';

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
Vue.http.options.root = '/app#'
const  vue=new Vue({
    data(){
        favicon:favicon
    },
    store,
    router,
    http: {
        headers: {
            Authorization: 'Basic YXBpOnBhc3N3b3Jk'
        }
    },
    mounted(){
    }
}).$mount('#app');
