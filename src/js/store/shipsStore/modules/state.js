// import structureForm from "../../structure/structureForm";
// import api from "../../api";
// import moment from "moment";
export default {
  actualDataGrid: [],
  settingsFilter: {},
  iceClass: [],
  countries:[],
  allShips:[],
  shipTypes:[],
  fullShips:[],
  iceClasses:["Нет","Ice1","Ice2","Ice3","Arc4","Arc5","Arc6","Arc7","Arc8","Arc9","Icebreaker6","Icebreaker7","Icebreaker8","Icebreaker9"],
  shipForm: {
    name: "",
    imo: "",
    registerNumber: "",
    registrationNumber: "",
    boardNumber: "",
    callsign: "",
    iceClass: "",
    overallLength: 0,
    breadth: 0,
    draught: 0,
    deadweight: 0,
    grossTonnage: 0,
    propulsionMotorPower: 0,
    stern: "",
    bulb: true,
    telephone: "",
    fax: "",
    email: "",
    fuelLight: 0,
    fuelHeavy: 0,
    fuelSpg: 0,
    flagId: null,
    shipTypeId: null,
    // shipownerId: 0,
  },
};
