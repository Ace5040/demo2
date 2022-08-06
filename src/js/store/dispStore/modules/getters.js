import state from "./state";

export default {
  shipsDataGrid: (state) => state.shipsDataGrid,
  actualDataGrid: (state) => state.actualDataGrid,
  filledForms: (state) => state.filledForms,
  allShips: (state) => state.allShips,
  asyncShip: (state) => state.allShips,
  backendForms: (state) => state.backendForms,
  nameMarker: (state) => state.nameMarker,
  asyncCargoTypes: (state) => state.asyncCargoTypes,
  asyncPortplace: (state) => state.ports,
  allPorts: (state) => state.allPorts,
};
