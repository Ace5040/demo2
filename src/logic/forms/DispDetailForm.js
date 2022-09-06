import moment from "moment";
import notify from "devextreme/ui/notify";
import Map from "../components/Map";
import RouteController from "../components/RouteController";
import EditGrid from "../components/EditGrid";

import { getCustomCoorinates, setCustomCoorinates } from "../../js/tools/map";
import api from "../../api";

class DispDetailForm {
  constructor(form, Vue, popups) {
    this.form = form;
    this.formName = form.name;
    console.log("🚀 ~ file: DispDetailForm.js ~ line 14 ~ DispDetailForm ~ constructor ~ this.formName", this.formName);
    this.$Vue = Vue;
    this.metaData = form.metaData;
    this.popups = popups;
    this.formName = this.form.name;
    this.backendForms = this.$Vue.store.getters[this.getStoreName("backendForms")][this.formName];
    this.lastNameBtnMarker = "";
    this.redux = this.$Vue.$redux.storeRedux;
    this.footer = this.form.getComponentByName("EPCSFooter").component;
    this.activeShipId = null;
    this.mapsForm = ["SwimDispAqua", "CreateDispAqua","EnterDispAquaInn"];
    this.oldShipCoords = [];

    if (this.mapsForm.includes(this.formName)) {
      this.map = new Map(form, Vue);
    }

    Vue.$bus.$on(["getAsyncShip", "getAsyncImo", "getAsyncCargoTypes", "getAsyncPortplace"], (data) =>
      this._getSelectData(data)
    );
    Vue.$bus.$on("checkSave", () => this.checkSave());
    Vue.$bus.$on("saveDisp", () => this.saveDisp());
    Vue.$bus.$on("fillShip", (data) => this._getShip(data));
    Vue.$bus.$on("checkChangeShipCoords", (e) => this._checkChangeShipCoords(e));
    Vue.$bus.$on("canselChangeCoords", (e) => this.canselShipCoords(e));
    Vue.$bus.$on("toggleTabs", (e) => this.toggleTabs(e));
    Vue.$bus.$on(["shipCoords", "placeNsr", "exit", "enter", "departure", "destination"], (e) => this.fillCoords(e));

    if (this.metaData.disabled) this._setDisabled();
    if (this.form.getComponentByName("route")) this._createRoute();

    this._getDisp();
    this._createEditGrids();
  }

  _getSelectData(data) {
    let asyncName = this.getStoreName(`async${data.asyncSetting.asyncName}`);
    //формируем строку с названием action (пример iceClass -> getIceClass)
    this.$Vue.store.dispatch(asyncName).then(() => {
      //получаем данные из геттера
      let asyncData = this.$Vue.store.getters[asyncName];
      this.$Vue.$bus.$emit(`putAsync${data.asyncSetting.asyncName}`, asyncData);
    });
  }

  _getShip(data) {
    //добавляем имо или название корабля
    let isShip = data.asyncSetting.displayExpr !== "imo",
      cardShip = this.$Vue.store.getters[this.getStoreName("allShips")][data.value],
      shipInput = this.form.getComponentByName("name").component,
      imoInput = this.form.getComponentByName("imo").component;
    isShip ? imoInput.setValue(cardShip.imo) : shipInput.setValue(cardShip.sid);
  }

  _getDisp() {
    const { id, nameForm } = this.metaData;
    if (id && nameForm) {
      this.$Vue.store.dispatch(this.getStoreName("getDisp"), this.metaData).then((disp) => {
        this.fillForm(disp);
        //Сохраняем shipId в случае если не будет изменяться корабль
        this.activeShipId = disp.shipId;
      });
    }
  }

  _createRoute() {
    this.routeController = new RouteController(
      {
        component: this.form.getComponentByName("route"),
        componentMap: this.form.getComponentByName("routeMap"),
        buttonActivateMap: this.form.getComponentByName("activateRouteMapButton"),
        buttonClear: this.form.getComponentByName("clearRouteButton"),
      },
      this.$Vue
    );
  }

  _createEditGrids() {
    if (this.formName === "ExitSeePort" || this.formName === "CreateDispAqua") {
      this.editGridCargo = this.form.getComponentByName("cargoTypes").component;
      this.editGridLogic = new EditGrid(this.editGridCargo, this.form, this.$Vue);
      this.editGridHazard = this.form.getComponentByName("hazardClasses").component;
      this.editGridLogic = new EditGrid(this.editGridHazard, this.form, this.$Vue);
    }
  }

  fillForm(disp) {
    if (disp) {
      this.form.components.forEach((component) => {
        const name = component.componentName,
          lowerName = name.toLowerCase(),
          element = this.form.getComponentByName(name).component;
        if (name.substr(0, 4) === "EPCS") return;
        if (disp[name]) element.setValue(disp[name]);
        if (name === "name") return element.setValue(disp.ship.name);
        if (name === "imo") return element.setValue(disp.ship.imo);
        if (lowerName.includes("lat") || lowerName.includes("lon")) {
          let elem = this.form.getComponentByName(name).component;
          let route = this.form.getComponentByName(`EPCS${name}`).component;
          let parent = this.form.getComponentByParentId(elem.parentId);
          setCustomCoorinates(elem, route);
          if (this.mapsForm.includes(this.formName)) {
            this.map.changeCoords(parent.components);
          }
        }
        // if (lowerName.includes("date")) {
        //   let date = moment(disp[name]).format("DD.MM.YYYY hh:mm:ss");
        //   element.setValue(date);
        // }
      });
    }
  }

  fillCoords(e) {
    let name = e.event,
      nameCoords = `EPCS${name}`,
      id = e.value,
      elemCoords = {},
      coords = [];

    if (name === "shipCoords") {
      elemCoords = this.$Vue.store.getters[this.getStoreName("allShips")][id];
      console.log("🚀 ~ file: DispDetailForm.js ~ line 136 ~ DispDetailForm ~ fillCoords ~ elemCoords", elemCoords)
      coords = elemCoords.gposition.coordinates.map((el) => el.toFixed(2));
      console.log("🚀 ~ file: DispDetailForm.js ~ line 138 ~ DispDetailForm ~ fillCoords ~ coords", coords)
      if(e.asyncSetting) this._getShip(e);
    } else {
      elemCoords = this.$Vue.store.getters[this.getStoreName("allPorts")][id];
      coords = elemCoords.sgeomlocation.coordinates.map((el) => el.toFixed(2));
    }

    if (elemCoords) {
      let coordsInputs = this.form.getComponentByName(nameCoords).components,
        lat = coordsInputs[0].component,
        routeLat = coordsInputs[1].component,
        lon = coordsInputs[2].component,
        routeLon = coordsInputs[3].component;

      setCustomCoorinates(lat, routeLat, coords);
      setCustomCoorinates(lon, routeLon, coords);
    }
  }

  _setDisabled() {
    this.form.components.forEach((component) => {
      const name = component.componentName;
      this.form.getComponentByName(name).component.setDisabled(true);
    });

    this.footer.getProps().rightLabel = "";
    this.footer.getProps().middleLabel = "";
  }

  saveDisp() {
    //Забираем заполненную форму которая пришла с бэка (мы ее сохранили в стор)
    // Забираем все value и с  помощью id клонируем обьект и отправляем его на сохранение
    const { id, nameForm, nameEvent } = this.metaData;
    const formForSave = { ...this.$Vue.store.getters[this.getStoreName("filledForms")][id] };
    let formData = {};

    //делаем из backendForms обьект
    this.backendForms.forEach((el) => (formData[el] = ""));
    this.form.components.forEach((component, idx) => {
      let name = component.componentName,
        lowerName = name.toLowerCase(),
        value;

      if (name.substr(0, 4) === "EPCS" && name !== "EPCSDataGrid") return;
      try {
        value = this.form.getComponentByName(name).component.getValue();
      } catch (e) {
        throw new Error(`not value from ${name}`);
      }

      if (name in formData) formData[name] = value;
      if (name === "name") formData.shipId = typeof value === "string" ? this.activeShipId : value;
      if (name === "icing") formData.icing = value = value !== "НЕТ";
      // if (name === "ctFk")
      if (lowerName.includes("date")) formData[name] = moment(value).toJSON();
      if (lowerName.includes("lat") || lowerName.includes("lon")) formData[name] = this.getCoord(component);

      formData.createDate = moment().toJSON();
      if (id) formData.id = id;
    });

    // let arr = Object.keys(formData).filter((el) => !this.backendForms.includes(el) && el !== "id");

    // проверяем что все поля заполнены
    let isEmptyFormData = !!Object.values(formData).filter((el) => el === "" || el === undefined || el === null).length;
    // Если не все поля заполнены то выдаем ошибку, иначе отправляем на сохранение
    if (isEmptyFormData) {
      notify({ message: "Заполните все необходимые поля", width: 400, shading: true }, "error", 2500);
    } else {
      let payload = {
        nameEvent,
        nameForm,
        id,
        formData,
      };
      this.$Vue.store.dispatch(this.getStoreName("saveDisp"), payload).then(() => {
        this.$Vue.$bus.$emit("goToMainPage");
      });
    }
  }

  canselShipCoords() {
    let event = { event: "shipCoords", value: this.form.getComponentByName("name").component.getValue() };
    console.log("🚀 ~ file: DispDetailForm.js ~ line 220 ~ DispDetailForm ~ canselShipCoords ~ event", event)

    this.fillCoords(event);
    // console.log("🚀 ~ file: DispDetailForm.js ~ line 218 ~ DispDetailForm ~ canselShipCoords ~ e", this.oldShipCoords)
    // let coords = this.form.getComponentByName("EPCSshipCoords").components;
    // let   ship = this.form.getComponentByName("name").component.getValue()
  }

  toggleTabs(e) {
    console.log("🚀 ~ file: DispDetailForm.js ~ line 218 ~ DispDetailForm ~ toggleTabs ~ e", e);
    this.map.changeCoords();
  }

  getCoord(component) {
    console.log("🚀 ~ file: DispDetailForm.js ~ line 217 ~ DispDetailForm ~ getCoord ~ component", component);
    let parentComponents = this.form.getComponentByParentId(component.parentId).components,
      coords = getCustomCoorinates(parentComponents);
    if (component.componentName.toLowerCase().includes("lat")) return coords[0];
    if (component.componentName.toLowerCase().includes("lon")) return coords[1];
  }

  _checkChangeShipCoords(components) {
    let parentComponents = this.form.getComponentByParentId(components[0].parentId).components,
      coords = getCustomCoorinates(parentComponents),
      oldCoords = this.oldShipCoords;
    if (oldCoords.length && coords) {
      if (oldCoords[0] !== coords[0] || oldCoords[1] !== coords[1]) {
        this.$Vue.$bus.$emit("shipCoordsChange");
      }
    } else {
      this.oldShipCoords = coords;
    }
  }

  checkSave() {
    //Если форма заблокирована, нам не надо вызывать модальное окно т.к. изменений нет
    let isDisabled = this.metaData.disabled;
    this.$Vue.$bus.$emit(isDisabled ? "goToMainPage" : "changeDataPopup");
  }

  getStoreName(name) {
    return `dispStore/${name}`;
  }
}

export default DispDetailForm;
