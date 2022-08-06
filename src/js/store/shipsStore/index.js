import Vue from "vue";
import Vuex from "vuex";
import actions from "./modules/actions";
import getters from "./modules/getters";
import mutations from "./modules/mutations";
import state from "./modules/state";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state,actions,mutations,getters
// })

export default {
  namespaced: true,
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
}