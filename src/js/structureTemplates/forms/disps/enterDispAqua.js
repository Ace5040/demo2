export default {
  structureType: "Form",
  components: [
    {
      id: 100,
      priority: 1,
      parentId: 0,
      visible: true,
      row: 6,
      componentName: "EPCSMainHeader",
      component: "EPCSFormHeader",
      props: { title: "Вход в акваторию СМП", headerButtons: {} },
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
      component: "EPCSFormInput",
      visible: true,
      componentName: "name",
      col: 8,
      props: {
        type: "selectAsync",
        placeholder: "Выберете судно",
        items: [],
        label: "1\/\/ Название судна",
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
        label: "2\/\/ Номер  IMO (при наличии)",
        labelPosition: "left",
        value: "",
        labelRequired: false,
        items: [],
        event: "fillShip",
        invalidMessage:"IMO должно состоять из 7 символов",
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
      parentId:198,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirection",
      col: 8,
      props: {
        type: "row",
        label: "3\/\/ Дата, время (московское) и место пересечения границы акватории СМП",
      },
    },
    {
      id: 104,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "enterDate",
      col: 6,
      props: {
        type: "date",
        value: "",
        placeholder:"дд.мм.гггг 00:00"
      },
    },
    {
      id: 105,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "enterPlace",
      props: {
        placeholder: "Выберите порт/локацию",
        value: "",
        type: "selectAsync",
        items: [],
        event: "enter",
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
      componentName: "EPCSenter",
      props: {
        type: "row",
        label:'4\/\/ Географические координаты пересечения границы СМП'
      },
    },
    {
      id: 107,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "enterLat",
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
      componentName: "EPCSenterLat",
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
      componentName: "enterLon", 
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
      componentName: "EPCSenterLon",
      col: 2,
      props: {
        type: "select",
        items: ["E", "W"],
        placeholder: "E",
        value: "E",
      },
    },  
    {
      id: 112,
      parentId: 198,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "course",
      col: 8,
      props: {
         type: "number",
        step:1,
        label: "5\/\/ Курс судна с точностью до 1 градуса",
        labelPosition: "left",
         
        placeholder: "000",
      },
    },
    {
      id: 113,
      parentId: 198,
      priority: 1,
      component: "EPCSFormInput",
      col: 8,
      componentName: "speed",
      props: {
         type: "number",
        step:1,
        label: "6\/\/ Скорость судна с точностью до 0.1 узла",
        labelPosition: "left",
        placeholder: "0.0",
         
      },
    },
    {
      id: 114,
      parentId: 198,
      priority: 1,
      component: "EPCSDirection",
      visible: true,
      componentName: "EPCSDirection3",
      col: 8,
      props: {
        type: "row",
        label: "7\/\/ Планируемое время (московское):",
      },
    },
    {
      id: 115,
      parentId: 114,
      priority: 1,
      component: "EPCSRadioButtonGroup",
      visible: true,
      componentName: "exitType",
      col: 12,
      props: {
        type: "row",
        inputData: {
          1: "Выхода из акватории СМП",
          2: "Прихода в морской порт в акватории СМП",
        },
        value: 1,
      },
    },
    {
      id: 116,
      parentId: 114,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "exitDate",
      col: 6,
      props: {
        type: "date",
        value: "",
        placeholder:"дд.мм.гггг 00:00"
      },
    },
    {
      id: 117,
      parentId: 114,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "exitPlace",
      props: {
        placeholder: "Выберите порт/локацию",
        value: "",
        type: "selectAsync",
        items: [],
        event: "exit",
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
      id: 118,
      parentId: 198,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSexit",
      col: 8,
      props: {
        type: "row",
       
      },
    },
    {
      id: 119,
      parentId: 118,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "exitLat",
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
      id: 120,
      parentId: 118,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "EPCSexitLat",
      col: 2,
      props: {
        type: "select",
        items: ["N", "S"],
        placeholder: "N",
        value: "N",
      },
    },
    {
      id: 121,
      parentId: 118,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "exitLon", 
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
      id: 122,
      parentId: 118,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "EPCSexitLon",
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
        rightLabel:"Отправить",
        rightType:'primary',
        rightEvent:'saveDisp',
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
