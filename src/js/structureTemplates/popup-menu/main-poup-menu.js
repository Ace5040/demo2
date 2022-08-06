export default {
  buttonArr: [
    {
      data: {
        title: "Диспетчерские СМП",
        buttonIcon: "F033",
        state: "unfolded",
        event: "getComponent",
        nameForm: "MainForm",
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
          event: "getComponent",
          nameForm: "",
        },
        {
          title: "Диспетчерские сводки",
          buttonIcon: "F005",
        },
        {
          title: "Фотографии",
          buttonIcon: "F003",
          event: "getComponent",
          nameForm: "PhotoDisp",
        },
      ],
      open: false,
    },
    {
      data: { title: "Флот", buttonIcon: "F033", state: "unfolded", event: "getComponent", nameForm: "ShipsForm" },
      open: false,
    },
  ],
};
