import Component from "./Component";
// import Vue component

class EPCSFooter extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSFooter";
    this.props = {
      disabled:false
    };
    this.validateProps = [
      "type",
      "components",
      "rightLabel",
      "middleEvent",
      "middleLabel",
      "middleType",
      "middleDisabled",
      "leftDisabled",
      "rightEvent",
      "rightType",
      "rightLabel",
      "leftLabel",
      "leftType",
      "leftEvent",
      "disabled",
    ];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  setDisabled(disabled) {
    this.props.rightDisabled = disabled
  }
}

export default EPCSFooter;
