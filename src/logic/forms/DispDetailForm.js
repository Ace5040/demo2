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
    this.$Vue = Vue;
    this.metaData = form.metaData;
    this.popups = popups;
    this.formName = this.form.name;
    this.backendForms = this.$Vue.store.getters[this.getStoreName("backendForms")][this.formName];
    this.lastNameBtnMarker = "";
    this.redux = this.$Vue.$redux.storeRedux;
    this.footer = this.form.getComponentByName("EPCSFooter").component;
    this.activeShipId = null;

    this.map = new Map(form, Vue);

    Vue.$bus.$on("saveDisp", () => this.saveDisp());
    //Проверяем выводить popup или нет
    Vue.$bus.$on("checkSave", () => this.checkSave());
    Vue.$bus.$on(["getAsyncShip", "getAsyncImo", "getAsyncCargoTypes", "getAsyncPortplace"], (data) =>
      this._getSelectData(data)
    );
    Vue.$bus.$on("fillShip", (data) => this._getShip(data));
    Vue.$bus.$on(["shipCoords", "placeNsr", "exit", "enter", "departure", "destination"], (e) =>
      this.map.fillCoords(e)
    );

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
      ships = this.$Vue.store.getters[this.getStoreName("allShips")],
      cardShip = ships.filter((el) => el.id === data.value)[0],
      shipInput = this.form.getComponentByName("name").component,
      imoInput = this.form.getComponentByName("imo").component;

    isShip ? imoInput.setValue(cardShip.imo) : shipInput.setValue(cardShip.name);
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
      Vue
    );
  }

  _createEditGrids() {
    if (this.formName === "ExitSeePort") {
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
          this.map.changeCoords(parent.components);
        }
        // if (lowerName.includes("date")) {
        //   let date = moment(disp[name]).format("DD.MM.YYYY hh:mm:ss");
        //   element.setValue(date);
        // }
      });
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
      console.log(
        "🚀 ~ file: DispDetailForm.js ~ line 129 ~ DispDetailForm ~ this.form.components.forEach ~ name",
        name
      );

      try {
        value = this.form.getComponentByName(name).component.getValue();
      } catch (e) {
        throw new Error(`not value from ${name}`);
      }

      if (name in formData) formData[name] = value;
      if (name === "name") formData.shipId = typeof value === "string" ? this.activeShipId : value;
      if (name === "icing") formData.icing = value = value !== "НЕТ";
      if (name === "ctFk")
        console.log(
          "🚀 ~ file: DispDetailForm.js ~ line 181 ~ DispDetailForm ~ this.form.components.forEach ~ value",
          value
        );
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
      console.log("🚀 ~ file: DispDetailForm.js ~ line 165 ~ DispDetailForm ~ saveDisp ~ formData", formData);
      this.$Vue.store.dispatch(this.getStoreName("saveDisp"), payload).then(() => {
        this.$Vue.$bus.$emit("goToMainPage");
      });
    }
  }

  getCoord(component) {
    let parentComponents = this.form.getComponentByParentId(component.parentId).components,
      coords = getCustomCoorinates(parentComponents);
    if (component.componentName.toLowerCase().includes("lat")) return coords[0];
    if (component.componentName.toLowerCase().includes("lon")) return coords[1];
  }

  setImoOrShip(data) {
    if (data.value.id) {
      if (data.searchMode === "name") {
        this.form.getComponentByName("imo").component.setSearchValue(data.value.imo);
        // this.form.getComponentByName("nameShip").component.setSearchValue(data.value.name);
      }
      if (data.searchMode === "imo") {
        this.form.getComponentByName("nameShip").component.setSearchValue(data.value.name);
        // this.form.getComponentByName("Imo").component.setSearchValue(data.value.imo);
      }
    }
  }

  checkSave() {
    console.log(this.metaData);
    //Если форма заблокирована, нам не надо вызывать модальное окно т.к. изменений нет
    let isDisabled = this.metaData.disabled;
    this.$Vue.$bus.$emit(isDisabled ? "goToMainPage" : "changeDataPopup");
  }

  getStoreName(name) {
    return `dispStore/${name}`;
  }
}

export default DispDetailForm;
