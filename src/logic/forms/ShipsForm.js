import { concat } from "lodash";
import moment from "moment";
import Filter from "../components/Filter";
// Тут пишем бизнес-логику, в зависимости от того что нам нужно
// соблюдая паттерны проектирования.

class ShipsForm {
  constructor(form, Vue, popups) {
    this.form = form;
    this.$Vue = Vue;
    this.shipList = [];
    this.validateColumns = ["registerNumber", "id", "iceClass", "flagId", "name", "imo", "createDate"];
    this.dataGrid = this.form.getComponentByName("ShipsDataGrid").component;
    this.header = this.form.getComponentByName("MainShipHeader").component;
    this.popup = this.form.getComponentByName("EPCSPopup").component;
    this.popups = popups;
    this.filter = new Filter(this.popups.shipFilterPopup, Vue, this.dataGrid, this.header);
    this.redux = this.$Vue.$redux.storeRedux;
    this.activeRowData = null;
    this.settingsFilter = this.$Vue.store.getters[this.getStoreName("settingsFilter")];
    this.getShipsList();
    this.getIceClasses();

    // запрашиваем данные по id
    Vue.$bus.$on("openShip", (e) => this.openShip());
    Vue.$bus.$on("editShip", (e) => this.getShip("edit"));
    Vue.$bus.$on("copyShip", (e) => this.getShip("copy"));
    Vue.$bus.$on("deleteShip", (e) => this.deleteShip(e));
    Vue.$bus.$on("activeShipRow", (e) => this.setActiveRow(e));
    Vue.$bus.$on("filteringShipsData", (e) => this.setFilter());
    Vue.$bus.$on("clearShipFilter", () => this.filter.clearFilter());
    Vue.$bus.$on("clearActiveRows", () => this.clearActiveRows());
  }

  //удалить после появления статусов
  randomStatus() {
    // случайное число от min до (max+1)
    let statuses = ["Черновик", "На рассмотрении", "Отклонено", "Подтверждено"];
    let rand = 0 + Math.random() * (4 - 0);
    return statuses[Math.floor(rand)];
  }
  //Получаем список кораблей
  getShipsList() {
    //получаем данные с сервера
    this.$Vue.store.dispatch(this.getStoreName("getShipList")).then(() => {
      let ships = this.$Vue.store.getters[this.getStoreName("fullShips")];
      if (ships) {
        ships = ships.map(
          (item, i) =>
            (item = { status: this.randomStatus(), ...item, iceClass: item.iceClass ? item.iceClass : "Нет" })
        );
        this.createTableData(ships);
        this.generateUniqNames(ships);
        //Сохраняем даные в стор
        this.$Vue.store.commit(this.getStoreName("createStructureForm"), this.dataGrid.props.tableData);
        //Если есть фильтр то фильтруем данные
        if (Object.keys(this.settingsFilter).length) {
          this.setFilter();
        }
      }
    });
  }

  getIceClasses() {
    let iceClasses = this.$Vue.store.getters[this.getStoreName("iceClasses")];
    const filterShip = this.popups.shipFilterPopup.components[1];
    filterShip.props.items = iceClasses;
  }

  getShip(nameEvent) {
    // Если есть event значит это или копирование или редактирование и disabled = false
    // Если просто клик в DataGrid то Eventa нет и инпуты заблокированы
    let payload = {
      id: this.activeRowData.id,
      nameForm: "ShipsDetailForm",
      nameEvent,
      disabled: !nameEvent,
    };
    if (payload.id && payload.nameForm) this.$Vue.$bus.$emit("getComponent", payload);
  }

  //Создаем структуру таблицы исходя из колонок
  // В данном случае идет преобразование даты и смена имени для nameDisp
  createTableData(data) {
    let tableData = [],
      columns = this.dataGrid.getColumnNames();
    data.forEach((disp, idx) => {
      let dataGridRow = {};
      columns.forEach((col) => {
        dataGridRow.id = disp.id;
        if (col === "shipType" && disp[col]) return (dataGridRow[col] = disp[col].name);
        if (col === "flag" && disp[col]) return (dataGridRow[col] = disp[col].alpha2);
        if (col === "N") return (dataGridRow[col] = idx + 1);
        dataGridRow[col] = disp[col];
      });
      tableData.push(dataGridRow);
    });
    // меняем данные для DataGrid
    this.dataGrid.setTableData(tableData);
  }

  setFilter() {
    const filteringData = this.filter.filteringPopup();
    //Если есть фильтр то передаем дату фильтрованную если нет то забираем из стора актуальную информацию
    this.dataGrid.setTableData(filteringData);
    this.header.setActiveFilter();
    this.header.deactivateRow("shipsForm");
  }

  //При клике в DataGrid сохраняем data строки, который понадобится для открытия\редактирования и устанавливаем активнеые кнопки в хедере
  setActiveRow(e) {
    this.activeRowData = e.data;
    //Добавляем статус строки, чтобы вызывать разные попапы для строк
    let updateMetaData = { ...this.form.metaData, status: e.data.status };
    this.form.setMetaData(updateMetaData);
    this.header.deactivateRow("shipsForm");
    this.header.activateRow(e.data.status === "Подтверждено" ? "shipsConfirmForm" : "shipsForm");
  }

  clearActiveRows() {
    this.header.deactivateRow("shipsForm");
    this.$Vue.$bus.$emit("deselectAll");
  }

  clearActiveRows() {
    this.header.deactivateRow("shipsForm");
    this.$Vue.$bus.$emit('deselectAll')
  }

  getStoreName(name) {
    return `shipsStore/${name}`;
  }
  //для выведения в фильтр
  generateUniqNames(ships) {
    const uniqShips = Array.from(new Set(ships)),
      filterShip = this.popups.shipFilterPopup.components[0];
    filterShip.props.items = uniqShips;
  }

  deleteShip() {
    let id = this.activeRowData.id;
    if (id) {
      this.$Vue.store.dispatch(this.getStoreName("deleteShip"), id).then(() => {
        this.dataGrid.deleteRow(id);
        this.header.deactivateRow("shipsForm");
      });
    }
  }

  openShip(nameEvent) {
    let payload = {
      id: this.activeRowData.id,
      nameForm: "ShipsDetailForm",
      nameEvent: nameEvent || "",
      disabled: !nameEvent,
    };

    if (payload.id) {
      this.$Vue.$bus.$emit("getComponent", payload);
    }
  }
}

export default ShipsForm;
