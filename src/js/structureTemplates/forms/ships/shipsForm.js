import headerButtons from "../../header/headerShipButtons";
import inputComponentProps from "../../popup-menu/main-poup-menu";

export default {
  structureType: "Form",
  components: [
    {
      id: 100,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "MainShipHeader",
      component: "EPCSFormHeader",
      props: { title: "Флот", headerButtons },
    },
    {
      id: 101,
      parentId: 0,
      priority: 1,
      visible: true,
      componentName: "ShipsDataGrid",
      enumeration: true,
      component: "EPCSDataGrid",
      props: {
        noDataText: "Суда отсутствуют",
        tableData: [],
        eventDoubleClick: "openShip",
        eventClick: "activeShipRow",
        pageSize: 10,
        selectionMode: "single",
        rowTemplate:'flag',
        inputColumnNames: {
          N:"N",
          name: "Наименование",
          flag:'Флаг',
          imo: "IMO",
          registerNumber:"Регистровый номер",
          shipType:'Тип судна',
          iceClass:'Ледовый класс',
          status:'Статус',
        },
      },
    },
    
    {
      id: 102,
      priority: 1,
      parentId: 0,
      visible: true,
      component: "EPCSPopup",
      componentName: "EPCSPopup",
    },
    {
      id: 103,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "EPCSPopupMenu",
      component: "EPCSPopupMenu",
      props: {
        iconData: "61454",
        label: "Навигация",
        width: 340,
        inputComponentProps
        
      },
    },
  ],
};
