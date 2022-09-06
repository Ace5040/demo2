import moment from "moment";
import structureForm from "../../../structureTemplates/names/nameForms";
export default {
  updateSettingFilter: (state, payload) => {
    state.settingsFilter = payload;
  },
  createStructureForm(state, res) {
    state.actualDataGrid = res;
  },
  saveShips(state, res) {
    state.allShips = {};
    Object.values(res).forEach((el) => {
      let { sid, name, imo } = el;
      let row = { id :sid, name, imo };
      state.ships.push(row);
      state.allShips[sid] = el
    });
  },
  saveCargoTypes(state, res) {
    state.asyncCargoTypes = res;
  },
  savePorts(state, res) {
    state.ports = []
    res.forEach(port => {
      state.allPorts[port.pname] = port 
      state.ports.push({name:port.pname})
    })
  },
};
