import Component from "./Component";

// import Vue component

class EPCSTabs extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSTabs";
        this.props = {value: null};
        this.col = dataComponent.col
        this.validateProps = [
            "label",
            "value",
            "dataTabs",
            "event"
        ];
        this._setPropsBeforeCreate(dataComponent);
    }


    getComponentName() {
        return this.nameTemplate;
    }

}

export default EPCSTabs;
