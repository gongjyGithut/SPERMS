import { Loading } from 'element-ui'
const loading = {
    state: {
        loadingCount: 0,
        distance: null
    },
    mutations: {
        showLoading(state) {
            state.loadingCount += 1
            if (state.distance === null) {
                state.distance = Loading.service({})
            }
        },
        hideLoading(state) {
            if (state.loadingCount > 0) {
                state.loadingCount -= 1
            }
            if (state.loadingCount === 0 && state.distance) {
                state.distance.close()
                state.distance = null
            }
        },
        forceClose(state) {
            if (state.distance) {
                state.distance.close()
                state.distance = null
                state.loadingCount = 0
            }
        }
    },
}

export default loading