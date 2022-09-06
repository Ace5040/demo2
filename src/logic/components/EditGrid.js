import api from "../../api";

class EditGrid {
  constructor(editGrid, form, Vue) {
    this.editGrid = editGrid;
    this.editGridName = editGrid.name;
    this.form = form;
    this.$Vue = Vue;
    this.tableData = editGrid.props.tableData;

    this.getValues();
    Vue.$bus.$on(this.editGrid.props.addEvent, (e) => this.addRow(e));
    Vue.$bus.$on("deleteRowEditGrid", (e) => this.deleteRow(e));
    Vue.$bus.$on("updateTableData", (e) => this.updateTableData(e));
  }

  getValues() {
    if (this.editGridName === "cargoTypes") {
      return api.getCargoTypes().then((res) => {
        let types = res.data.map((type) => type.name).filter((el) => el !== null);
        this.editGrid.props.columnComponents.cargoType.props.items = types;
      });
    }
    if (this.editGridName === "hazardClasses") {
      return api.getHazardClasses().then((res) => {
         let hazardClasses = res.data.map((hazardClass) => hazardClass.name).filter((el) => el !== null);
         this.editGrid.props.columnComponents.hazardClasses.props.items = hazardClasses;
      });
    }
  }

  fillTable(data) {
    this.editGrid.setTableData(data);
    if (this.editGrid.props.num) {
      this.updateNum();
    }
  }

  addRow(e) {
    let newRow = {}
    let columns = this.editGrid.props.columnComponents
    Object.keys(columns).forEach(el => {
      newRow[el] = columns[el].props.value
    })

    this.editGrid.addRow(newRow);
    if (this.editGrid.props.num) {
      this.updateNum();
    }
  }

  deleteRow(idx) {
    this.editGrid.setTableData(this.tableData.splice(idx, 0));
  }

  updateTableData(e) {
    let { name, rowIndex, value } = e;
    this.tableData[rowIndex][name] = value;
  }

  updateNum() {
    this.tableData.forEach((el, i) => {
      el.N = i + 1;
    });
  }
}

export default EditGrid;
