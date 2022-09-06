import popupMenu from "../../popup-menu/mainPopupMenu"
import popupMenuRight from "../../popup-menu/popupMenuRight";
import headerButtons from "../../header/headerButtons";
import inputComponentProps from "../../../structureTemplates/popup-menu/main-poup-menu";
export default {
  structureType: "Form",
  components: [
    {
      id: 100,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "MainHeader",
      component: "EPCSFormHeader",
      props: { title: "Диспетчерские СМП", headerButtons },
    },
    {
      id: 101,
      parentId: 0,
      priority: 2,
      visible: true,
      componentName: "MainDataGrid",
      component: "EPCSDataGrid",
      props: {
        noDataText: "Диспетчерские СМП отсутствуют",
        tableData: [],
        eventDoubleClick: "openDisp",
        eventClick: "activeRow",
        pageSize: 10,
        selectionMode: "single",
        pageSizes:[10,20],
        inputColumnNames: {
          N:"N",
          nameDisp : "Диспетчерское СМП",
          createDate: "Дата и время",
          shipName: "Судно",
          imo: "IMO",
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
    // {
    //   id: 202,
    //   priority: 1,
    //   parentId: 0,
    //   visible: true,
    //   component: "EPCSPopup",
    //   componentName: "EPCSPopup",
    // },
    {
      id: 2000,
      priority: 1,
      parentId: 0,
      visible: true,
      component: "EPCSJoystick",
      componentName: "EPCSJoystick",
      props: {
        leftEvent: "joystickLeftButton",
        rightEvent: "joystickRightButton"
      }
    },
    popupMenu,
    popupMenuRight
  ],
};
