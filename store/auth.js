import cookies from 'js-cookie';

export const state = () => ({
    user: null,
    token: null
})

export const mutations = {
    set_user(store, data) {
        store.user = data
    },
    set_token(store, data) {
        store.token = data
    },
    reset_user(store) {
        store.user = null
    },
    reset_token(store, data) {
        store.token = null
    }
}

export const actions = {
    async login({ commit, dispatch }, token) { // this is also used as a general purpose "refresh user details" in middlewares and dashboard.vue
        return new Promise((resolve, reject) => {
            fetch(`${process.env.backendURL}/auth/me`, {
                headers: {
                    Authorization: token
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        reject(data.error)
                    } else {
                        commit('set_user', data)
                        commit('set_token', token)
                        resolve(data)
                    }
                })
        })
    },
    async logout({ commit }) {
        return new Promise(async (resolve, reject) => {
            let token = cookies.get('itinerary-token')
            let res = await fetch(`${process.env.backendURL}/auth/remove/?token=${token}`, {
                method: "POST"
            })
            let data = await res.json()

            cookies.remove('itinerary-token')
            commit('reset_user')
            commit('reset_token')

            if (data.error) {
                resolve(data.error)
            } else {
                resolve('logged out')
            }
        })
    },
    async clearLoggedInState({ commit }) {
        cookies.remove('itinerary-token');
        commit('reset_user');
        commit('reset_token');
    }
}