// Тут пишем бизнес-логику, в зависимости от того что нам нужно
// соблюдая паттерны проектирования.
import FormController from "../../js/form/FormController";

class Popup {
  constructor(form, Vue, popups) {
    this.form = form;
    this.popups = popups;

    this.popup = this.form.getComponentByName("EPCSPopup").component;
    this.$Vue = Vue;
    this.nameFilters = {
      shipFilterPopup : "shipsStore/settingsFilter",
      filterPopup : "dispStore/settingsFilter"
    }
    this.createBusForPopups();
    this.$Vue.$bus.$on('checkDeleteShip',()=> this.checkDeleteShip())

  }

  createBusForPopups() {
    Object.keys(this.popups).forEach((popup) => {
      this.$Vue.$bus.$on(popup, () => {
        let propsPopup = this.popups[popup].getFormPopupForVue();
        if (propsPopup.filter) {
          this.checkFilterProps(popup);
        } else {
          this.activatePopup(propsPopup)
        }
      });
    });
  }

  activatePopup(props) {
    this.popup.setProps(props);
    this.$Vue.$bus.$emit("showPopup");
  }

  checkDeleteShip() {
    let {status} = this.form.metaData,
    props;
    if(status === "Подтверждено") {
      props = this.popups.deleteСonfirmPopup.getFormPopupForVue()
    } else {
      props = this.popups.deleteShipPopup.getFormPopupForVue()
    }
    this.activatePopup(props)
  }

  checkFilterProps(popup) {
    let propsPopup = this.popups[popup].getFormPopupForVue(),
    getterFilter = JSON.parse(sessionStorage.getItem("dispFilter"))
    if(getterFilter) {
      // let settingsFilter = this.$Vue.store.getters[getterFilter];
      // if (Object.keys(settingsFilter).length) {
        propsPopup.components.forEach((elem) => {
          let component = elem.component,
            name = component.name;
          if (getterFilter[name]) component.props.value = getterFilter[name];
        });
      // }
    }
    this.activatePopup(propsPopup);
  }
}

export default Popup;
