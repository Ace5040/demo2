import CoordinatesController from "./CoordinatesController";
import RouteMapController from "./RouteMapController";
import { hasChangesInArray } from "../../js/tools/tools";

class RouteController {

    constructor({ component, componentMap, buttonActivateMap, buttonClear }, Vue) {

        this.coordinatesController = new CoordinatesController(component, Vue);
        this.mapController = new RouteMapController(componentMap, buttonActivateMap, Vue);
        this.buttonClear = buttonClear.component;
        this.buttonActivateMap = buttonActivateMap.component;
        this.value = [];
        this.$Vue = Vue;

        Vue.$bus.$on("clearRoute", () => this.clear());
        Vue.$bus.$on("mapCoordinatesChange", (e) => this.onMapCoordinatesChange(e));
        Vue.$bus.$on("coordinatesChange", () => this.onCoordinatesChange());
        Vue.$bus.$on("deleteRoute", () => this.clear(false));
    }

    setValue(value) {
        this.value = value || [];

        this.coordinatesController.setValue(this.value);
        this.mapController.setValue(this.value);
    }

    acceptEdit() {
        this.mapController.acceptEdit();
    }

    getValue() {
        return this.coordinatesController.getValue();
    }

    getChanges() {
        const newValue = this.getValue();

        return {
            value: newValue,
            hasChanges: hasChangesInArray(newValue, this.value)
        }
    }

    setDisabled(value) {
        this.coordinatesController.setDisabled(value);
        this.buttonClear.setDisabled(value);
        this.buttonActivateMap.setDisabled(value);
    }

    clear(askForDelete = true) {
        if (askForDelete && this._hasValue()) {
            this.$Vue.$bus.$emit("deleteRoutePopup");
        }
        else {
            this.mapController.clear();
            this.coordinatesController.setValue([]);
        }
    }

    _hasValue() {
        let value = this.coordinatesController.getValue();
        if (value && value.length) {
            return true;
        }

        value = this.mapController.getValue();
        return value && value.length;
    }

    onMapCoordinatesChange(coordinates) {
        this.coordinatesController.setValue(coordinates);
    }

    onCoordinatesChange() {
        const coordinates = this.coordinatesController.getValue();
        this.mapController.setValue(coordinates);
    }

    destroy() {
        this.mapController.destroy();
    }
}

export default RouteController;