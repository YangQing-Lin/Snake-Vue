import { createStore } from 'vuex'

export default createStore({
    state: {
        score: 0,
        record: 0,
        restart: true,
        AcWingOS: "AcWingOS",
        access: "",
        refresh: "",
    },
    getters: {
    },
    mutations: {
        updateScore: (state, score) => {
            state.score = score;
        },
        updateRecord: (state, score) => {
            if (state.record < score) {
                state.record = score;
            }
        },
        updateRestart: (state, restart) => {
            state.restart = restart;
        },
        updateAccess: (state, access) => {
            state.access = access;
        },
        updateRefrest: (state, refresh) => {
            state.refresh = refresh;
        },
    },
    actions: {
    },
    modules: {
    }
})
