import moment from "moment";
import structureForm from "../../../structureTemplates/names/nameForms";
export default {
  createStructureForm(state, res) {
    state.actualDataGrid = res;
  },
  clearFilter(state) {
    state.settingsFilter = {};
  },
  saveFilter(state, filter) {
    state.settingsFilter = filter;
  },
  saveIceClasses(state, res) {
    state.iceClasses = res.map(function (el) {
      return { name: el.iceClass, ...el };
    });
  },
  saveShipTypes(state, res) {
   state.shipTypes = res
  },
  saveFullShips(state,res) {
    state.fullShips = res
  },
  saveShips(state, res) {
    Object.values(res).forEach((el) => {
      state.allShips.push({
        id: el.id,
        name: el.name,
        imo: el.imo,
      });
    });
  },
  saveImo(state, res) {
      
  },
  saveCountries(state, res) {
    state.countries = res;
  },
};
