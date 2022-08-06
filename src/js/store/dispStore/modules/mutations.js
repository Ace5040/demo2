import moment from "moment";
import structureForm from "../../../structureTemplates/names/nameForms";
export default {
  saveDisp: (state, payload) => {
    //Создаем новый дисп
    const newDisp = {},
      components = payload.components,
      formName = payload.formName;
    components.forEach((component) => {
      if (component.subComponents) {
        component.subComponents.forEach((subComponent) => {
          if (subComponent.storeName) newDisp[subComponent.storeName] = subComponent.value;
        });
      } else {
        if (component.storeName) {
          newDisp[component.storeName] = component.value;
        }
      }
      newDisp.nameDisp = formName;
    });
    //Делаем структуру обьекта корабля
    newDisp.ship = {};
    newDisp.ship.name = newDisp.name;
    delete newDisp.name;
    newDisp.ship.imo = newDisp.imo;
    delete newDisp.imo;
    newDisp.createDate = moment().format("DD-MM-YYYY:hh:mm:ss");
    //Добавляем ID
    let arrayId = Object.keys(state.actualForms),
      lastId = +arrayId[arrayId.length - 1];
    newDisp.id = lastId + 1;
    state.actualForms[lastId + 1] = newDisp;
  },
  updateSettingFilter: (state, payload) => {
    state.settingsFilter = payload;
  },
  createStructureForm(state, res) {
    state.actualDataGrid = res;
  },
  saveFilter(state, filter) {
    state.settingsFilter = filter;
  },
  createFormWithId(state, res) {
    if (res.id) {
      state.filledForms[res.id] = res;
    }
  },
  clearFilter(state) {
    state.settingsFilter = {};
  },
  saveShips(state, res) {
    state.allShips = [];
    Object.values(res).forEach((el) => {
      let { id, name, imo } = el;
      let row = { id, name, imo };
      state.allShips.push(row);
    });
  },
  saveCargoTypes(state, res) {
    state.asyncCargoTypes = res;
  },
  allowMarker(state, name) {
    state.nameMarker = name;
  },
  savePorts(state, res) {
    state.ports = []
    res.forEach(port => {
      state.allPorts[port.pname] = port 
      state.ports.push({name:port.pname})
    })
    
  },
};
