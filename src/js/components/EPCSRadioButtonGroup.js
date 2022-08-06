import Component from "./Component";
// import Vue component

class EPCSRadioButtonGroup extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSRadioButtonGroup";
    this.props = {value:"CreateDispAqua"};
    this.col = dataComponent.col
    this.validateProps = [
      "type",
      "inputData",
      "value",
      "label",
      "event",
      "value"
    ];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }
}

export default EPCSRadioButtonGroup;
