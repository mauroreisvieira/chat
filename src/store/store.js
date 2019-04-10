import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLogged: false,
    },
    actions: {
        validateSession: (context) => {
            context.state.isLogged = localStorage.getItem('isLogged') ? localStorage.getItem('isLogged') : false;
        },
        login: (context, value) => {
            context.state.isLogged = value;
        }
    }
});
