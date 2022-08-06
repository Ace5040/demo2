export default {
  id: 2002,
  priority: 1,
  parentId: 0,
  componentName: 'EPCSRightPopupMenu',
  component: 'EPCSPopupMenu',
  props: {
    iconData: '61454',
    label: 'Навигация',
    type: 'right',
    isOpen: false,
    inputComponentProps: {
      iconData: '61454',
      label: 'Навигация',
      width: 450,
      selectionMode: 'single',
      eventDoubleClick: 'openNotification',
      tableData: [
        {
          icon1: "F001",
          icon2: "F047",
          description: 'Подано новое диспетчерское сообщение',
          date: 'сегодня 08:14',
          link: '',
          eventData: {},
          nameForm: 'ExitDispAqua',
          id:2,
          disabled:true
        },
        {
          icon1: "F001",
          icon2: "F047",
          description: 'Диспетчерское сообщение было изменено',
          date: 'сегодня 06:38',
          link: '',
          nameForm: 'ExitDispAqua',
          id:2,
          disabled:true
        },
        {
          icon1: "F001",
          icon2: "F047",
          description: 'Диспетчерское сообщение не подано',
          date: 'вчера 18:44',
          link: '',
          nameForm: 'ExitDispAqua',
          disabled:false
        },

      ]
    },
    width: 340,
  }
}