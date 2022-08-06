import api from "../../../../api";
export default {
  saveNewDisp({ commit }, formDataDisp) {
    commit("saveNewDisp", formDataDisp);
  },
  getShips({ commit }) {
    return api.getShips().then((res) => {
      if (res.status === 200) commit("saveShips", res.data);
    });
  },
  getDisp({ commit }, data) {
      return api.getDisp(data).then((res) => res.data)
  },
  getDispList({ commit }) {
    return api.getDispList().then((res) => {
      commit("createStructureForm", res.data);
    });
  },
  deleteDisp({ commit }, data) {
    return api.deleteDisp(data).then((res) => {
      // if (res.status === 204) commit("deleteDisp", data);
      return res
    });
  },
  asyncShip({commit,state}) {
    return api.getShips().then((res) => {
      if (res.status === 200) commit("saveShips", res.data);
    });
  },
  asyncCargoTypes({commit,state}) {
    return api.getCargoTypes().then((res) => {
      if (res.status === 200) commit("saveCargoTypes", res.data);
    });
  },
  asyncPortplace({commit}) {
    return api.getPorts().then((res) => {
      if (res.status === 200) commit("savePorts", res.data);
    });
  },
  saveDisp({ commit }, data) {
    if(data.nameEvent === 'edit') {
       return api.saveDisp(data).then((res) => {
      // if (res.status === 204) commit("deleteDisp", id);
      });
    } else {
      return api.saveNewDisp(data).then((res) => {
        // if (res.status === 204) commit("deleteDisp", id);
        });
    }
    // return api.saveNewDisp(data).then((res) => {
    //   // if (res.status === 204) commit("deleteDisp", id);
    // });
  }
};
