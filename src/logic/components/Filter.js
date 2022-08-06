// Тут пишем бизнес-логику, в зависимости от того что нам нужно
// соблюдая паттерны проектирования.
import moment from "moment";
class Filter {
  constructor(popup, Vue,dataGrid,header) {
    this.popup = popup;
    this.$Vue = Vue;
    this.namePopup = popup.name;
    this.filterObj = {};
    this.dataGrid = dataGrid
    this.header = header
  }

  // получаем имя для стора
  getStoreName(name) {
    if (this.namePopup === "shipFilterPopup") {
      return `shipsStore/${name}`;
    }
    if (this.namePopup === "filterPopup") {
      return `dispStore/${name}`;
    }
  }

  //создаем обьект фильтра
  createFilterObj() {
    let filterPopup = Object.values(this.popup.getAllComponents());
    if (filterPopup.length) {
      this.filterObj = {};
      filterPopup.forEach((filter) => {
        let component = filter.component,
          name = component.name;
        if (name.substr(0, 4) !== "EPCS") {
          let value = component.getValue();
          if (value) {
            switch (name) {
              case "dateBefore":
                this.checkDateBefore(value);
                break;
              case "dateAfter":
                this.checkDateAfter(value);
                break;
              case "shipName":
                this.checkShipName(value);
              default:
                this.filterObj[name] = value;
                break;
            }
          }
        }
      });
      sessionStorage.setItem("dispFilter", JSON.stringify(this.filterObj));
      // this.$Vue.store.commit(this.getStoreName("saveFilter"), this.filterObj);
      return this.filterObj;
    }
  }
  filteringPopup() {
    // const storeFilter = this.$Vue.store.getters[this.getStoreName("settingsFilter")];
    const sessionFilter = JSON.parse(sessionStorage.getItem("dispFilter"))
    let filterObj = sessionFilter ? sessionFilter : this.createFilterObj();
    //Создаем обьект с именами колонок, чтобы фильтровать строки
    let tableData;
    //фильтруем по строкам
    if (Object.keys(filterObj).length) {
      let actualDataGrid = this.$Vue.store.getters[this.getStoreName("actualDataGrid")];
      tableData = actualDataGrid.filter(function (row) {
        return this.every(([key, v]) => {
          let checkFilter = {},
            formatDate = "DD.MM.YYYY hh:mm:ss";
          if (key.includes("date")) {
            let rowDate = moment(row.createDate, formatDate),
              before,
              after;
            if (filterObj.dateBefore) {
              before = filterObj.dateBefore.isBefore(rowDate);
            } else {
              let oldBefore = moment("01.01.2015 00:00:00", formatDate);
              before = oldBefore.isBefore(rowDate);
            }
            if (filterObj.dateAfter) {
              after = filterObj.dateAfter.isAfter(rowDate);
            } else {
              let newAfter = moment();
              after = newAfter.isAfter(rowDate);
            }
            //проверяем чтобы время попало в диапозон
            checkFilter.date = before && after;
          } else {
            checkFilter[key] = row[key] === v;
          }
          let checkRow = Object.values(checkFilter).some((elem) => elem);
          return checkRow;
        });
      }, Object.entries(filterObj));
    }
    return tableData;
  }

  clearFilter() {
    const actualDataGrid = this.$Vue.store.getters[this.getStoreName("actualDataGrid")];
    this.dataGrid.setTableData(actualDataGrid);
    this.header.clearFilter();
    sessionStorage.removeItem('dispFilter')
    this.$Vue.$bus.$emit('deselectAll')
  }

  checkDateBefore(val) {
    this.filterObj.dateBefore = moment(val);
  }
  checkDateAfter(val) {
    this.filterObj.dateAfter = moment(val);
  }

  checkShipName(val) {
    if (val && val !== "Все суда") {
      this.filterObj.shipName = val;
    }
  }
}

export default Filter;
