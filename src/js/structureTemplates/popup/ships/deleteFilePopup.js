export default {
  structureType: "Popup",
  name: "deleteFilePopup",
  props: {
    header: "Удаление элемента",
    text: "Вы хотите удалить файл?",
    submitBtns: true,
    submitLabel: "Да",
    width: 500,
    submitEvent: "deleteFile",
    canselLabel:'Нет'
  },
};
