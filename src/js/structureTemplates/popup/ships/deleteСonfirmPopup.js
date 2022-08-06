export default {
  structureType: "Popup",
  name: "deleteCofirmPopup",
  props: {
    header: "Удаление элемента",
    text: "С данным судном могут быть связанные документы. Вы хотите отправить запрос на удаление судна?",
    submitBtns: true,
    submitLabel: "Отправить",
    width: 500,
    submitEvent: "deleteShip",
    canselLabel:'Отмена'
  },
};
