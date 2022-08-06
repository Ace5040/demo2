import Component from "./Component";
import moment from "moment";
class EPCSEditDataGrid extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSEditDataGrid";
    this.dataComponent = dataComponent;
    this.props = {
      disabled: false,
      tableData: [],
      pageSize:10,
    };
    this.validateProps = [
      "disabled",
      "noDataText",
      "tableData",
      "pageSize",
      "inputColumnNames",
      "eventClick",
      "selectionMode",
      "eventDoubleClick",
      "loadState",
      "rowTemplate",
      "edit",
      "selectedRows",
      "keyExpr",
      "setSelectEvent",
      "num",
      "templateRow",
      "values",
      "columnComponents",
      "label"
    ];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  setTableData(data) {
    this.props.tableData = []
    this.props.tableData = data;
  }
  deleteRow(id) {
    this.props.tableData = this.props.tableData.filter((el) => el.id !== id);
  }

  getProps() {
    return this.props;
  }

  getColumnNames() {
    return this.columnNames;
  }

  selectRow(idx) {
    this.props.selectedRows = [idx]
  }

  addRow(row) {
    this.props.tableData.push(row)  
  }
}

export default EPCSEditDataGrid;
