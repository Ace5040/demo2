import structureForm from "../../js/structureTemplates/names/nameForms";
import moment from "moment";
import Filter from "../components/Filter";
// Тут пишем бизнес-логику, в зависимости от того что нам нужно
// соблюдая паттерны проектирования.

import Joystick from "../components/Joystick";

class DispForm {
  constructor(form, Vue, popups) {
    this.form = form;
    this.$Vue = Vue;

    this.dataGrid = this.form.getComponentByName("MainDataGrid").component;
    this.header = this.form.getComponentByName("MainHeader").component;
    this.popup = this.form.getComponentByName("EPCSPopup").component;
    this.settingsFilter = sessionStorage.getItem("dispFilter");

    this.popups = popups;
    this.store = this.$Vue.store;
    this.actualOpenDisp = "CreateDispAqua";
    this.activeRowData = null;
    this.storeName = "dispStore";
    this.filter = new Filter(this.popups.filterPopup, Vue, this.dataGrid, this.header);
    // this.settingsFilter = JSON.parse(sessionStorage.getItem("DispForm")) || {};
    this.joystick = new Joystick(form, Vue);
   
    //получаем данные с сервера
    this.getDispList();
    // запрашиваем данные по id
    Vue.$bus.$on("copyDisp", (e) => this.getDisp("copy",e));
    Vue.$bus.$on("editDisp", (e) => this.getDisp("edit",e));
    Vue.$bus.$on("openDisp", (e) => this.getDisp());
    Vue.$bus.$on("activeRow", (e) => this.setActiveRow(e));
    Vue.$bus.$on("deleteDisp", (e) => this.deleteDisp(e));
    Vue.$bus.$on("filteringData", (e) => this.setFilter());
    Vue.$bus.$on("addActualDisp", (e) => this.addActualDisp(e));
    Vue.$bus.$on("addNewDisp", () => this.openDisp());
    Vue.$bus.$on("clearFilter", () => this.filter.clearFilter());
    Vue.$bus.$on("clearActiveRows", () => this.clearActiveRows())
    Vue.$bus.$on("openSection", (e) => this.openSection(e));
    Vue.$bus.$on("openNotification", (e) => this.openNotification(e));
  }

  createDataGridStructure(store) {
    let responseDataGrid = store.getters[this.getStoreName("actualDataGrid")];
    //Создаем структуру с подменой имен столбцов
    this.createTableData(responseDataGrid);
  }

  openSection(e) {
    if (e.formName !== this.form.getFormName()) {
      let sectionName = e.formName
      this.$Vue.$bus.$emit("getComponent", {nameForm: sectionName, meta: e});
    }
  }

  openNotification(e) {    
      this.$Vue.$bus.$emit(e.data.disabled ?  "getComponent" : "newDispPopup",e.data);
  }

  //Создаем структуру таблицы исходя из колонок
  // В данном случае идет преобразование даты и смена имени для nameDisp
  createTableData(data) {
    const tableData = [];
    data.forEach((disp,idx) => {
      let dataGridRow = {};
      this.dataGrid.getColumnNames().forEach((col) => {
        dataGridRow.id = disp.id;
        if (col === "N")  return dataGridRow[col] = idx+1
        if (col === "nameDisp") return (dataGridRow[col] = structureForm[disp[col]]);
        if (col === "createDate") return (dataGridRow[col] = moment(disp[col]).format("DD.MM.YYYY hh:mm:ss"));
        dataGridRow[col] = disp[col];
      });
      tableData.push(dataGridRow);
    });
    // меняем данные для DataGrid
    this.dataGrid.setTableData(tableData);
    let filter = this.$Vue.store.getters[this.getStoreName("settingsFilter")];
    if (Object.keys(filter).length) this.filteringData(filter);
  }

  setFilter() {
    const filteringData = this.filter.filteringPopup();
    //Если есть фильтр то передаем дату фильтрованную если нет то забираем из стора актуальную информацию
    this.dataGrid.setTableData(filteringData);
    this.header.setActiveFilter();
  }

  addActualDisp(e) {
    this.actualOpenDisp = e;
  }

  openDisp() {
    this.$Vue.$bus.$emit("getComponent", { nameForm: this.actualOpenDisp, disabled: false });
  }

  //При клике в DataGrid сохраняем data строки, который понадобится для открытия\редактирования
  setActiveRow(e) {
    this.activeRowData = e.data;
    this.header.activateRow("mainForm");
  }

  clearActiveRows() {
    this.header.deactivateRow("mainForm");
    this.$Vue.$bus.$emit('deselectAll')
  }

  deleteDisp(e) {
    let name;
    Object.entries(structureForm).forEach((el) => {
      if (el[1] === this.activeRowData.nameDisp) name = el[0];
    });
    let payload = {
      nameForm: name,
      id: this.activeRowData.id,
    };
    this.$Vue.store.dispatch(this.getStoreName("deleteDisp"), payload).then((res) => {
      if (res.status === 204) {
        this.getDispList();
        this.header.deactivateRow("mainForm");
      }
    });
  }
  // STORE
  getDispList() {
    this.$Vue.store.dispatch(this.getStoreName("getDispList")).then(() => {
      this.createDataGridStructure(this.$Vue.store);
      this.generateUniqNames();

      this.$Vue.store.commit(this.getStoreName("createStructureForm"), this.dataGrid.props.tableData);
      if (Object.keys(this.settingsFilter).length) {
        this.setFilter();
      }
    });
  }
  //Делаем имена кораблей для инпута в фильтре
  generateUniqNames() {
    const actualDataGrid = this.$Vue.store.getters[this.getStoreName("actualDataGrid")],
      uniqShips = [],
      filterShip = this.popups.filterPopup.components[1];
    actualDataGrid.forEach((el) => {
      if (!uniqShips.includes(el.shipName)) uniqShips.push(el.shipName);
    });
    filterShip.props.items = uniqShips;
  }

  getDisp(nameEvent,e) {
    // Если есть event значит это или копирование или редактирование и disabled = false
    // Если просто клик в DataGrid то Eventa нет и инпуты заблокированы
    let payload = {
      id: this.activeRowData.id,
      nameForm: this.activeRowData.nameDisp,
      nameEvent,
      disabled: !nameEvent,
    };
    //Получаем имя диспа для получения c бэка
    Object.entries(structureForm).forEach((el) => {
      if (el[1] === payload.nameForm) payload.nameForm = el[0];
    });

    if (payload.id && payload.nameForm) this.$Vue.$bus.$emit("getComponent", payload);
  }
  getStoreName(name) {
    return `dispStore/${name}`;
  }
}

export default DispForm;
