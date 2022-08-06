import Component from "./Component";
import moment from "moment";
// import Vue component
// import Vue component
/**
 * @class EPCSDataGrid - класс компонента реализующий взаимодействие между логикой и представлением
 */
class EPCSDataGrid extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSDataGrid";
    this.columnNames = Object.keys(dataComponent.props.inputColumnNames);
    this.dataComponent = dataComponent;
    this.props = {
      disabled: false,
      tableData: [],
      pageSize:10,
      storageName: this.getName()
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
      "columnComponents"
    ];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  setTableData(data) {
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
  
  getValue() {
    return this.props
  }
}

export default EPCSDataGrid;
