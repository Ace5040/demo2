export default {
  structureType: "Form",
  components: [
    {
      id: 100,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "EPCSHeader",
      component: "EPCSFormHeader",
      props: { title: "Заход в морской порт", headerButtons: {} },
    },
    {
      id: 198,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionSubMain",
      props: {
        type: "row",
      },
    },
    {
      id: 101,
      parentId: 198,
      priority: 1,
      col: 8,
      component: "EPCSFormInput",
      visible: true,
      componentName: "name",
      props: {
        type: "selectAsync",
        placeholder: "Выберете судно",
        items: [],
        label: "1// Название судна",
        labelPosition: "left",
        value: "",
        event: "fillShip",
        labelRequired: true,
        asyncSetting: {
          displayExpr: "name",
          valueExpr: "id",
          customValue: true,
          asyncName: "Ship",
          templateRow: {
            id: null,
            name: "",
            imo: null,
          },
        },
      },
    },
    {
      id: 102,
      parentId: 198,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 8,
      componentName: "imo",
      props: {
        type: "selectAsync",
        placeholder: "Номер IMO",
        label: "2// Номер  IMO (при наличии)",
        labelPosition: "left",
        value: "",
        labelRequired: false,
        items: [],
        event: "fillShip",
        invalidMessage: "IMO должно состоять из 7 символов",
        asyncSetting: {
          displayExpr: "imo",
          valueExpr: "id",
          customValue: true,
          asyncName: "Ship",
          templateRow: {
            id: null,
            name: "",
            imo: null,
          },
        },
      },
    },
    {
      id: 103,
      parentId: 198,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDdd",
      col: 8,
      props: {
        type: "row",
        label: "3// Дата и время (московское) прибытия в порт, название порта/локации",
      },
    },
    {
      id: 104,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "placeNsrDate",
      col: 6,
      props: {
        type: "date",
        value: "",
        placeholder: "дд.мм.гггг 00:00",
      },
    },
    {
      id: 105,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "placeNsr",
      props: {
        placeholder: "Выберите порт/локацию",
        value: "",
        type: "selectAsync",
        items: [],
        event: "placeNsr",
        labelRequired: true,
        asyncSetting: {
          displayExpr: "name",
          valueExpr: "name",
          customValue: true,
          asyncName: "Portplace",
          templateRow: {
            name: "",
          },
        },
      },
    },
    {
      id: 106,
      parentId: 103,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSplaceNsr",
      props: {
        type: "row",
        event: "changeCoords",
      },
    },
    {
      id: 107,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "placeNsrLat",
      col: 4,
      props: {
        type: "number",
        step: 1,
        label: "Широта",
        labelPosition: "top",
        placeholder: "0.0",
        value: null,
      },
    },
    {
      id: 108,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "EPCSplaceNsrLat",
      col: 2,
      props: {
        type: "select",
        items: ["N", "S"],
        placeholder: "N",
        value: "N",
      },
    },
    {
      id: 109,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "placeNsrLon",
      col: 4,
      props: {
        type: "number",
        step: 1,
        label: "Долгота",
        labelPosition: "top",
        placeholder: "0.0",
        value: null,
      },
    },
    {
      id: 110,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "EPCSplaceNsrLon",
      col: 2,
      props: {
        type: "select",
        items: ["E", "W"],
        placeholder: "E",
        value: "E",
      },
    },
    {
      id: 200,
      priority: 5,
      component: "EPCSFooter",
      visible: true,
      componentName: "EPCSFooter",
      props: {
        leftEvent: "checkSave",
        leftType: "primary",
        leftLabel: "Назад",
        rightLabel: "Отправить",
        rightType: "primary",
        rightEvent: "saveDisp",
      },
    },
    {
      id: 202,
      priority: 1,
      parentId: 0,
      visible: true,
      component: "EPCSPopup",
      componentName: "EPCSPopup",
    },
  ],
};
