export const PULL = 'PULL' //获取权限
export const DESTROY = 'DESTROY' //

export default {
    state: {},
    mutations: {
        [PULL](state, permissions) {
            Object.assign(state, permissions)
        },
        [DESTROY](state) {
            Object.keys(state).forEach(key=>{
                state[key]={}
            })
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