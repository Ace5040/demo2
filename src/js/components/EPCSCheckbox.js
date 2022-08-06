import Component from "./Component";

// import Vue component

class EPCSCheckbox extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSCheckbox";
        this.props = {value: null};
        this.col = dataComponent.col
        this.validateProps = [
            "label",
            "value"
        ];
        this._setPropsBeforeCreate(dataComponent);
    }


    getComponentName() {
        return this.nameTemplate;
    }

}

export default EPCSCheckbox;
