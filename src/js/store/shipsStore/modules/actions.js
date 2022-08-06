import api from "../../../../api";
export default {
  getShip({ commit },id) {
    return api.getShip(id).then((res) => {
      // if (res.status === 200) commit("saveShips", res.data);
    });
  },
  asyncIceClasses({commit}) {
    return api.getIceClasses().then((res) => {
      if (res.status === 200) commit("saveIceClasses", res.data);
    });
  },
  asyncFlags({commit}) {
    return api.getCountries().then((res) => {
      if (res.status === 200) commit("saveCountries", res.data);
    });
  },
  asyncShip({commit,state}) {
    console.info('asd')
    return api.getShips().then((res) => {
      if (res.status === 200) commit("saveShips", res.data);
    });
  },
  asyncShipTypes({commit}) {
    return api.getShipTypes().then((res) => {
      if (res.status === 200) commit("saveShipTypes", res.data);
    });
  }, 
  saveShip({ commit }, data) {
    if(data.nameEvent === 'edit') {
       return api.saveShip(data).then(res => res);
    } else {
      return api.saveNewShip(data).then(res => res);
    }
  }, 
  deleteShip({ commit }, id) {
    return api.deleteShip(id).then((res) => true);
  },
  getShipList({ commit }) {
    return api.getShipList().then((res) => {
         commit("saveFullShips", res);
    });
  }

};
