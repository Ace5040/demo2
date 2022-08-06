export default {
  id: 2003,
  priority: 4,
  parentId: 0,
  componentName: "EPCSLeftPopupMenu",
  component: "EPCSPopupMenu",
  props: {
    iconData: "61454",
    label: "Навигация",
    width: 340,
    isOpen: false,
    inputComponentProps: {
      buttonArr: [
        {
          data: {
            title: "Диспетчерские СМП",
            buttonIcon: "F033",
            state: "unfolded",
            event: "openSection",
            formName: "MainForm",
          },
          open: false,
        },
        {
          data: {
            title: "Диспетчерские сообщения и сводки",
            buttonIcon: "F033",
            state: "unfolded",
          },
          children: [
            {
              title: "Диспетчерские сообщения",
              buttonIcon: "F006",
              isActive: false,
              event: "openSection",
              formName: "",
            },
            {
              title: "Диспетчерские сводки",
              buttonIcon: "F005",
            },
            {
              title: "Фотографии",
              buttonIcon: "F003",
              event: "openSection",
              formName: "PhotoDisp",
            },
          ],
          open: false,
        },
        {
          data: { title: "Флот", buttonIcon: "F033", state: "unfolded", event: "openSection", formName: "ShipsForm" },
          open: false,
        },
      ],
    },
  },
};
 