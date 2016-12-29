import Vue from 'vue'
import Cookies from 'js-cookie'
export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
    state: Cookies.getJSON('user') || {},
    mutations: {
        [USER_SIGNIN](state, user) {
            Cookies.set('user', user,{path:'/'})
            Object.assign(state, user)
        },
        [USER_SIGNOUT](state) {
            Cookies.remove('user');
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [USER_SIGNIN](store, user) {
            store.commit(USER_SIGNIN, user)
        },
        [USER_SIGNOUT]({commit}) {
            commit(USER_SIGNOUT)
        }
    }
}