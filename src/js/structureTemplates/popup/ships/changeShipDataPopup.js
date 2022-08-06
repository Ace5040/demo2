export default {
  structureType: "Popup",
  name: "changeShipDataPopup",
  props: {
    header: "Сохранение",
    text: "Данные были изменены. Сохранить?",
    submitBtns: true,
    submitLabel: "Да",
    width: 500,
    submitEvent: "saveShip",
    cancelEvent:'goToMainShipPage',
    cancelLabel:'Нет'
  },
};
