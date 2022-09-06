import structureForm from "../../names/nameForms";

export default {
  structureType: "Popup",
  name: "newDispPopup",
  props: {
    submitEvent: "addNewDisp",
    width: 400,
    header: "Выберите тип диспетчерского СМП:",
    submitBtns: true,
  },
  components: [
    {
      id: 1,
      parentId: 0,
      componentName: "EPCSRadioButtonGroup",
      component: "EPCSRadioButtonGroup",
      props: {
        value: "CreateDispAqua",
        type: "column",
        inputData: structureForm,
        event: "addActualDisp",
      },
    },
  ],
};
