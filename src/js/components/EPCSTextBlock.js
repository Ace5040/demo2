import Component from "./Component";

// import Vue component

class EPCSTextBlock extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSTextBlock";
        this.props = {};
        this.validateProps = [
            "text",
            "type"
        ];
        this._setPropsBeforeCreate(dataComponent);
    }

    getComponentName() {
        return this.nameTemplate;
    }

    getProps() {
        return this.props;
    }

    setDisabled(disabled) {
        this.props.disabled = disabled
    }
}

export default EPCSTextBlock;
