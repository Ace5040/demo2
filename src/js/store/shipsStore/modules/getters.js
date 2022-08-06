import state from "./state";

export default {
  actualDataGrid: (state)=> state.actualDataGrid,
  settingsFilter :(state)=> state.settingsFilter,
  asyncIceClasses:(state)=> state.iceClasses,
  asyncShipForm:(state) => state.shipForm,
  asyncShipTypes:(state) => state.shipTypes,
  asyncFlags:(state) => state.countries,
  asyncShip:(state) => state.allShips,
  sortDataGrid:(state) => state.sortDataGrid,
  shipForm:(state) => state.shipForm,
  iceClasses:(state) => state.iceClasses,
  fullShips:(state) => state.fullShips,
  
};