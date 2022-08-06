import axios from "axios";
import Vue from "vue";

const redux = Vue.prototype.$redux;

export default {
  publicationURL: "http://10.20.30.102:3000",
  namesController: {
    ExitDispAqua: "dispsExitNSR",
    EnterDispAqua: "dispsEnterNSR",
    EnterSeePort: "dispsEnterPort",
    CreateDispAqua: "dispsFollowNSR",
    SwimDispAqua: "dispsFloatNSR",
    ExitSeePort: "dispsExitPort",
  },
  getDispList() {
    return axios.get(`${this.publicationURL}/dispsNSR?filter[order]=createDate%20DESC&filter[limit]=30`, {}).then(function (response) {
      return response;
    });
  },

  getCountries() {
    let redux = Vue.prototype.$redux;
    return new Promise((resolve, reject) => {
      redux.storeRedux.dispatch(redux.functions.epcsGeneralOperations.asyncGetCountries()).then((res) => resolve(res.payload));
    });
  },

  getShipList() {
    let redux = Vue.prototype.$redux;
    return new Promise((resolve, reject) => {
      redux.storeRedux.dispatch(redux.functions.epcsGeneralOperations.asyncGetShipList()).then((res) => {
        resolve(res.payload);
      });
    });
  },
  getPorts() {
    return axios.get(`${this.publicationURL}/portplaces`, {}).then(function (response) {
      return response;
    });
  },
  getShips() {
    let redux = Vue.prototype.$redux;
    return new Promise((resolve, reject) => {
      redux.storeRedux.dispatch(redux.functions.epcsGeneralOperations.asyncGetShips())
      redux.storeRedux.subscribe(() => {
        let ships = redux.storeRedux.getState().nlcEpcsPortal.ships
        if(ships) resolve(ships);
      });
    });
  },

  getDisp(data) {
    let url = this.namesController[data.nameForm],
      id = data.id;
    return axios.get(`${this.publicationURL}/${url}/${id}?filter={"include":["ship"]}`, {}).then(function (response) {
      return response;
    });
  },
  getShips() {
    let redux = Vue.prototype.$redux;
    return new Promise((resolve, reject) => {
      redux.storeRedux.dispatch(redux.functions.epcsGeneralOperations.asyncGetShips())
      redux.storeRedux.subscribe(() => {
        let ships = redux.storeRedux.getState().nlcEpcsPortal.ships
        if(ships) resolve(ships);
      });
    });
  },
  saveNewDisp(data) {
    let url = this.namesController[data.nameForm],
      formData = data.formData;
    if (formData.id) delete formData.id;
    return axios.post(`${this.publicationURL}/${url}`, formData).then(function (response) {
      return response;
    });
  },
  saveDisp(data) {
    let url = this.namesController[data.nameForm],
      id = data.formData.id,
      formData = data.formData;
    return axios.patch(`${this.publicationURL}/${url}/${id}`, formData).then(function (response) {
      return response;
    });
  },
  deleteDisp(data) {
    let url = this.namesController[data.nameForm],
      id = data.id;
    return axios.delete(`${this.publicationURL}/${url}/${id}`, {}).then(function (response) {
      return response;
    });
  },
  saveNewShip(data) {
    let redux = Vue.prototype.$redux;
    return new Promise((resolve, reject) => {
      redux.storeRedux.dispatch(redux.functions.epcsGeneralOperations.saveNewShip(data.formData)).then(() => resolve(true))
    });
  },
  saveShip(data) {
    let redux = Vue.prototype.$redux;
    data.formData.id = data.id;
    return new Promise((resolve, reject) => {
      redux.storeRedux.dispatch(redux.functions.epcsGeneralOperations.changeShipData(data.formData)).then(() => resolve(true))
    });
  },
  deleteShip(id) {
    let redux = Vue.prototype.$redux;
    return new Promise((resolve, reject) => {
      redux.storeRedux.dispatch(redux.functions.epcsGeneralOperations.deleteShip(id)).then(() => resolve(true));
    });
  },
  getIceClasses() {
    let redux = Vue.prototype.$redux;
    return new Promise((resolve, reject) => {
      redux.storeRedux.dispatch(redux.functions.epcsGeneralOperations.asyncIceClasses()).then((res) => resolve(res.payload))
    });
  },
  getCargoTypes() {
    return axios.get(`${this.publicationURL}/cargoTypes`, {}).then(function (response) {
      return response;
    });
  },
  getHazardClasses() {
    return axios.get(`${this.publicationURL}/hazardClasses`, {}).then(function (response) {
      return response;
    });
  },
  getShipTypes() {
    return axios.get(`${this.publicationURL}/shipTypes`, {}).then(function (response) {
      return response;
    });
  },
  getCoordShip(id) {
    return axios.get(`${this.publicationURL}/ship-pos/${id}`, {}).then(function (response) {
      return response;
    });
  }
};
