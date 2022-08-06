import inputComponentProps from "../../popup-menu/main-poup-menu";
export default {
  structureType: "Form",
  components: [
    {
      id: 101,
      priority: 1,
      component: "EPCSMap",
      visible: true,
      col:6,
      componentName: "PhotoDisp",
      name: "PhotoDisp",
      props: { mapId: 'PhotoDisp' }
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
