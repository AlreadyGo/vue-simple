export const PULL = 'PULL' //获取权限

export default {
    state: {},
    mutations: {
        [PULL](state, permissions) {
            Object.assign(state, permissions)
        }
    },
    actions: {
        [PULL](store, permissions) {
            store.commit(PULL, permissions)
        },
    }
}