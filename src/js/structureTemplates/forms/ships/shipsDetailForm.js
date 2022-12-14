export default {
  structureType: "Form",
  components: [
    {
      id: 99,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "EPCSShipDetailHeader",
      component: "EPCSFormHeader",
      props: { title: "Сведения по судну", headerButtons: {} },
    },
    {
      id: 199,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionShipMain",
      props: {
        type: "row",
      },
    },
    {
      id: 198,
      parentId: 199,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionSubMain",
      col: 12,
      props: {
        type: "row",
      },
    },
    {
      id: 298,
      parentId: 198,
      priority: 1,
      component: "EPCSTabs",
      componentName: "EPCSShipTabs",
      col: 12,
      props: {
        dataTabs: [
          {
            name: "Сведения по судну",
          },
          {
            name: "Документы",
          },
        ],
      },
    },
    {
      id: 300,
      parentId: 298,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionShipTab",
      col: 12,
      props: {
        type: "row",
      },
    },
    {
      id: 301,
      parentId: 298,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionSubMain2",
      col: 12,
      props: {
        type: "row",
      },
    },
    {
      id: 100,
      parentId: 300,
      priority: 1,
      component: "EPCSTextBlock",
      visible: true,
      componentName: "EPCSTextBlockShip",
      props: {
        text: "Общие сведения",
        type: "h2",
      },
    },
    {
      id: 101,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "name",
      col: 6,
      props: {
        type: "selectAsync",
        placeholder: "Выберете судно",
        items: [],
        label: "Название судна",
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
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "imo",
      col: 6,
      props: {
        type: "selectAsync",
        placeholder: "Номер IMO",
        label: "Номер  IMO (при наличии)",
        labelPosition: "left",
        value: "",
        items: [],
        event: "fillShip",
        labelRequired: true,
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
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "registerNumber",
      name: "Регистровый номер",
      col: 6,
      props: {
        type: "text",
        placeholder: "Введите регистровый номер",
        label: "Регистровый номер",
        labelPosition: "left",
        value: "",
      },
    },
    {
      id: 104,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "registrationNumber",
      name: "Регистрационный номер (для маломерных судов)",
      col: 6,
      props: {
        type: "text",
        placeholder: "Введите регистрационный номер",
        label: "Регистрационный номер (для маломерных судов)",
        labelPosition: "left",
        value: "",
      },
    },
    {
      id: 105,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "boardNumber",
      name: "Бортовой номер (для маломерных судов)",
      col: 6,
      props: {
        type: "text",
        placeholder: "Введите бортовой номер",
        label: "Бортовой номер (для маломерных судов)",
        labelPosition: "left",
        value: "",
      },
    },
    {
      id: 106,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "callsign",
      name: "Позывной сигнал судна",
      col: 6,
      props: {
        type: "text",
        placeholder: "Введите позывной сигнал судна",
        label: "Позывной сигнал судна",
        labelPosition: "left",
        value: "",
      },
    },
    {
      id: 107,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "flagId",
      name: "Флаг государства судна",
      col: 6,
      props: {
        type: "selectAsync",
        placeholder: "Выберите страну",
        label: "Флаг государства судна",
        items: [],
        labelPosition: "left",
        value: "",
        labelRequired: true,
        asyncSetting: {
          displayExpr: "name",
          valueExpr: "isoCountryCode",
          asyncName: "Flags",
          templateRow: {
            name: "",
            isoCountryCode: null,
          },
        },
      },
    },
    {
      id: 108,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "shipTypeId",
      col: 6,
      props: {
        type: "selectAsync",
        placeholder: "Выберите тип судна",
        label: "Тип судна",
        items: [],
        labelPosition: "left",
        value: "",
        asyncSetting: {
          displayExpr: "name",
          valueExpr: "id",
          asyncName: "ShipTypes",
          templateRow: {
            id: null,
            name: "",
          },
        },
      },
    },
    {
      id: 109,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "iceClass",
      name: "Ледовый класс в соответствии с РМРС",
      col: 6,
      props: {
        type: "selectAsync",
        placeholder: "Выберите ледовый класс",
        label: "Ледовый класс в соответствии с РМРС",
        items: [],
        labelPosition: "left",
        value: "",
        labelRequired: true,
        asyncSetting: {
          asyncName: "IceClasses",
          displayExpr: "name",
          valueExpr: "iceClass",
          customValue: false,
          templateRow: {
            name: "",
            iceClass: null,
          },
        },
      },
    },
    {
      id: 110,
      parentId: 300,
      priority: 1,
      component: "EPCSTextBlock",
      visible: true,
      componentName: "EPCSTextBlockTech",
      props: {
        text: "Технические характеристики",
        type: "h2",
      },
    },
    {
      id: 111,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "overallLength",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Длина наибольшая, м ",
        labelPosition: "left",
        step: 1,
      },
    },
    {
      id: 112,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "grossTonnage",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Валовая вместимость, т",
        labelPosition: "left",
        step: 1,
      },
    },
    {
      id: 113,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "breadth",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Ширина наибольшая, м ",
        labelPosition: "left",
        value: null,
        step: 1,
      },
    },
    {
      id: 114,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "deadweight",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Дедвейт, т",
        labelPosition: "left",
        value: null,
        step: 1,
      },
    },
    {
      id: 115,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "draught",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Осадка максимальная, м ",
        labelPosition: "left",
        value: null,
        step: 1,
      },
    },
    {
      id: 116,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "propulsionMotorPower",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Мощность ГЭУ, кВт",
        labelPosition: "left",
        value: null,
        step: 1,
      },
    },
    {
      id: 117,
      parentId: 300,
      priority: 1,
      component: "EPCSDirection",
      visible: true,
      componentName: "EPCSDDir",
      props: {
        label: "Тип топлива и суточный расход, т",
      },
    },
    {
      id: 118,
      parentId: 117,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "fuelHeavy",
      col: 6,
      props: {
        type: "number",
        step: 1,
        label: "Тяжелое топливо",
        labelPosition: "left",
        placeholder: "0.0",
        step: 1,
      },
    },
    {
      id: 119,
      parentId: 117,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "fuelLight",
      col: 6,
      props: {
        type: "number",
        step: 1,
        label: "Легкое топливо",
        labelPosition: "left",
        placeholder: "0.0",
        step: 1,
      },
    },
    {
      id: 120,
      parentId: 117,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "fuelSpg",
      col: 6,
      props: {
        type: "number",
        step: 1,
        label: "СПГ",
        labelPosition: "left",
        placeholder: "0.0",
        step: 1,
      },
    },
    {
      id: 121,
      parentId: 300,
      priority: 1,
      component: "EPCSCheckbox",
      visible: true,
      col: 6,
      componentName: "bulb",
      props: {
        label: "Наличие бульба/аппарели",
        value: false,
      },
    },
    {
      id: 122,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "stern",
      props: {
        type: "text",
        placeholder: "Опишите особенности",
        label: "Особенности кормовой оконечности",
        labelPosition: "left",
        value: "",
      },
    },
    {
      id: 123,
      parentId: 300,
      priority: 1,
      component: "EPCSTextBlock",
      visible: true,
      componentName: "EPCSTextBlockContacts",
      props: {
        text: "Контактная информация",
        type: "h2",
      },
    },
    {
      id: 124,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "telephone",
      props: {
        type: "text",
        placeholder: "Укажите номер телефона судна",
        label: "Спутниковый тел. номер (при наличии)",
        labelPosition: "left",
        value: "",
      },
    },
    {
      id: 125,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      col: 6,
      componentName: "fax",
      props: {
        type: "text",
        placeholder: "Укажите номер судового факса",
        label: "Номер судового факса (при наличии)",
        labelPosition: "left",
        value: "",
      },
    },
    {
      id: 126,
      parentId: 300,
      priority: 1,
      component: "EPCSFormInput",
      visible: true,
      componentName: "email",
      col: 6,
      props: {
        type: "text",
        placeholder: "example@email.ru",
        label: "Адрес судовой электронной почты (при наличии)",
        labelPosition: "left",
        value: "",
        min:1,
        max:7
      },
    },
    {
      id: 100,
      parentId: 301,
      priority: 1,
      component: "EPCSTextBlock",
      visible: true,
      componentName: "EPCSTextBlockDocument",
      props: {
        text: `Судовые документы 
        (копии всех страниц, даже незаполненных, в формате pdf)`,
        type: "h2",
      },
    },
    {
      id: 127,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock",
      props: {
        label: "Классификационное свидетельство",
        labelRequired: true,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock"
        }
      },
    },
    {
      id: 128,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadCertificate",
      props: {
        label: "Свидетельство судна полярного плавания",
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "Certificate",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadCertificate"
        }
      },
    },
    {
      id: 129,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadCertificate1",
      props: {
        label:
          "Свидетельство на оборудование и снабжение по форме 4.1.1 РМРС либо Свидетельство не конвенционного судна",
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "Certificate1",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadCertificate1"
        }
      },
    },
    {
      id: 130,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock3",
      props: {
        label: "Перечень оборудования к Свидетельству судна полярного плавания",
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock3",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock3"
        }
      },
    },

    {
      id: 131,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock4",
      props: {
        label: "Меритильное свидетельство",
        labelRequired: true,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock4",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock4"
        }
      },
    },
    {
      id: 132,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock5",
      props: {
        label: "Страховка от загрязнения бункерным топливом",
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock5",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock5"
        }
      },
    },
    {
      id: 133,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock6",
      props: {
        label: "Страховка от загрязнения нефтью",
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock6",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock6"
        }
      },
    },
    {
      id: 136,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock7",
      props: {
        label: "Свидетельство о праве собственности на судно или иной документ, подтверждающий право собственности",
        labelRequired: true,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock7",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock7"
        }
      },
    },
    {
      id: 137,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock8",
      props: {
        label: "Свидетельство о праве плавания под государственным флагом РФ",
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock8",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock18"
        }
      },
    },
    {
      id: 138,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock9",
      props: {
        label: "Договор на предоставление услуг по ледокольной проводке",
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock9",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock9"
        }
      },
    },
    {
      id: 139,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock10",
      props: {
        label:
          `Судовой билет (для прогулочных яхт, маломерных судов, спортивных парусных судов) 
          или документ, аналогичный судовому билету, выданный администрацией государства флага или признанной ею организацией`,
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock10",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock10"
        }
      },
    },
    {
      id: 140,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: false,
      componentName: "uploadBlock11",
      props: {
        label: "Свидетельство, выданное организацией, уполномоченной на классификацию и освидетельствование судов, одобрившей проект разового перехода (перегона)",
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock11",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock11"
        }
      },
    },
    {
      id: 141,
      parentId: 301,
      priority: 1,
      component: "EPCSUploadBlock",
      visible: true,
      componentName: "uploadBlock12",
      props: {
        label: `Руководство по штатной буксировке или проект буксировки, одобренный организацией,
         уполномоченной на классификацию и освидетельствование судов (для буксируемых плавучих объектов 
          в установленном для них районе плавания, включая буксируемые плавучие буровые установки)`,
        labelRequired: false,
        uploadBtn: { type: "main" },
        correctTypes: ["pdf"],
        uploadedFiles: [],
        event: "uploadFiles",
        error: "",
        openEvent: "uploadBlock12",
        deleteEvent: "checkFilePopup",
        dataPopup:{
          pdfFile:'https://www.orimi.com/pdf-test.pdf',
          event : "uploadBlock12"
        }
      },
    },
    {
      id: 200,
      parentId: 0,
      priority: 5,
      component: "EPCSFooter",
      visible: true,
      componentName: "EPCSFooter",
      props: {
        leftEvent: "checkShipSave",
        leftType: "primary",
        leftLabel: "Назад",
        middleLabel: "Сохранить черновик",
        middleType: "primary",
        middleEvent: "saveDraft",
        rightLabel: "Отправить на рассмотрение",
        rightType: "primary",
        rightEvent: "saveShip",
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
