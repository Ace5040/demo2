import Component from "./Component";
// import Vue component

class EPCSDirection extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSDirection";
    this.props = {
      type: "row",
      disabled: false,
      
    };
    this.col = dataComponent.col
    this.validateProps = ["type", "label","disabled","event"];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  getProps() {
    return this.props;
  }
  setChildComponents(data) {
    this.props = { data, ...this.props };
  }
  // setDisabled(disabled) {
  //   this.props = {disabled,...this.props}
  // }
  setValue(value) {
    this.props.value = value;
  }
}

export default EPCSDirection;
