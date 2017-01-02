export const PULL = 'PULL' //获取权限
export const DESTROY = 'DESTROY' //

export default {
    state: JSON.parse(sessionStorage.getItem("permissions")) || {},
    mutations: {
        [PULL](state, permissions) {
            sessionStorage.setItem("permissions", JSON.stringify(Object.assign(state, permissions)));
        },
        [DESTROY](state) {
            Object.keys(state).forEach(key=>{
                state[key]={}
            });
            sessionStorage.removeItem("permissions")
        }
    },
    actions: {
        [PULL](store, permissions) {
            store.commit(PULL, permissions)
        },
        [DESTROY](store) {
            store.commit(DESTROY)
        },
    }
}