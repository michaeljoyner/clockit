import Vue from "vue";
import Vuex from "vuex";
import VuexPersistance from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistance({
  key: "clockit",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    mute: true,
    timeup_announcement: "Pens down bitches",
    startwatch_announcement: "Go, go, go",
    theme: "midnight"
  },
  getters: {
    muted(state) {
      return state.mute;
    },

    themeName(state) {
      return state.theme;
    },

    timeupAnnouncement(state) {
      return state.timeup_announcement;
    },

    startwatchAnnouncement(state) {
      return state.startwatch_announcement;
    }
  },
  mutations: {
    setTheme(state, themename) {
      state.theme = themename;
    },

    setMuted(state, set) {
      state.mute = set;
    },

    setTimeupAnnouncement(state, text) {
      state.timeup_announcement = text;
    },

    setStartwatchAnnouncement(state, text) {
      state.startwatch_announcement = text;
    }
  },
  actions: {},
  plugins: [vuexLocal.plugin]
});
