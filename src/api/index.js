import axios from "axios";
import Vue from "vue";

const redux = Vue.prototype.$redux;

export default {
  configDisps: Vue.prototype.configDisps,
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
    return axios.get(`${Vue.prototype.configDisps.urlMNS}/dispsNSR?filter[order]=createDate%20DESC&filter[limit]=30`, {}).then(function (response) {
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
    return axios.get(`${Vue.prototype.configDisps.urlMNS}/portplaces`, {}).then(function (response) {
      return response;
    });
  },
  getDisp(data) {
    let url = this.namesController[data.nameForm],
      id = data.id;
    return axios.get(`${Vue.prototype.configDisps.urlMNS}/${url}/${id}?filter={"include":["ship"]}`, {}).then(function (response) {
      return response;
    });
  },
  getShips() {
    return axios.get(`${Vue.prototype.configDisps.urlMNS}/ship-pos-owner?filter[limit]=30`, {}).then(function (response) {
      return response.data;
    });
  },
  saveNewDisp(data) {
    let url = this.namesController[data.nameForm],
      formData = data.formData;
    if (formData.id) delete formData.id;
    return axios.post(`${Vue.prototype.configDisps.urlMNS}/${url}`, formData).then(function (response) {
      return response;
    });
  },
  saveDisp(data) {
    let url = this.namesController[data.nameForm],
      id = data.formData.id,
      formData = data.formData;
    return axios.patch(`${Vue.prototype.configDisps.urlMNS}/${url}/${id}`, formData).then(function (response) {
      return response;
    });
  },
  deleteDisp(data) {
    let url = this.namesController[data.nameForm],
      id = data.id;
    return axios.delete(`${Vue.prototype.configDisps.urlMNS}/${url}/${id}`, {}).then(function (response) {
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
    return axios.get(`${Vue.prototype.configDisps.urlMNS}/cargoTypes`, {}).then(function (response) {
      return response;
    });
  },
  getHazardClasses() {
    return axios.get(`${Vue.prototype.configDisps.urlMNS}/hazardClasses`, {}).then(function (response) {
      return response;
    });
  },
  getShipTypes() {
    return axios.get(`${Vue.prototype.configDisps.urlMNS}/shipTypes`, {}).then(function (response) {
      return response;
    });
  },
  getCoordShip(id) {
    return axios.get(`${Vue.prototype.configDisps.urlMNS}/ship-pos/${id}`, {}).then(function (response) {
      return response;
    });
  }
};
