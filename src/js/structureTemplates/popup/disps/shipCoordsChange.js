export default {
  structureType: "Popup",
  name: "shipCoordsChange",
  props: {
    header: "Данные были изменены.",
    text: " Сохранить?",
    submitBtns: true,
    submitLabel: "Да",
    width: 500,
    submitEvent: "changeCoords",
    cancelEvent:'canselChangeCoords',
    cancelLabel:'Нет'
  },
};
