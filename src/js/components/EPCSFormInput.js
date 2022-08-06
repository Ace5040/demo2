import Component from "./Component";

class EPCSFormInput extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSFormInput";
    this.component = dataComponent;
    this.props = {
      placeholder: "",
      type: "text",
      disabled: false,
      value: null,
      isLoaded: true,
    };
    this.col = dataComponent.col;
    this.validateProps = [
      "label",
      "type",
      "value",
      "step",
      "placeholder",
      "items",
      "labelPosition",
      "searchMode",
      "event",
      "disabled",
      "labelRequired",
      "asyncSetting",
      
    ];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  getValue() {
    return this.props.value;
  }

  getShips() {}

  setPlaceholder(text) {
    this.props.data.placeholder = text;
  }

  setType(type) {
    this.props.type = type;
  }

  setValue(value) {

    this.props.value = value;
  }

  addSearchObject(searchObject) {
    this.props = { searchObject, ...this.props };
  }

  setSearchValue(value) {
    this.props.value = value;
    this.props.items.push(value);
  }

  setItems(items) {
    this.props.items = items;
  }
}

export default EPCSFormInput;
