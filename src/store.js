import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    announce_timeup: false,
    timeup_announcement: "Pens down bitches"
  },
  getters: {
    announce(state) {
      return state.announce_timeup;
    }
  },
  mutations: {},
  actions: {}
});
