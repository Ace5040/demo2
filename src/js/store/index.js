import Vue from "vue";
import Vuex from "vuex";
import dispStore from "./dispStore";
import shipsStore from "./shipsStore";

// export default {dispStore,shipsStore}
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dispStore,shipsStore
  },
});
