import coordinatesStructure from "../../js/structureTemplates/lines/coordinatesLine";
import AbstractListController from "../../js/form/AbstractListController";


class CoordinatesController extends AbstractListController {

    constructor(component, Vue) {
        super(component, 1500, coordinatesStructure, Vue);

        Vue.$bus.$on("addCoordinate", (e) => this.addLine(e));
        Vue.$bus.$on("deleteCoordinate", (e) => this.deleteLine(e.rowNumber));

        this.addLine();
        this.addLine();
    }

    getValue() {
        const result = [];

        for (let rowNumber = 1; rowNumber <= this.getRowCount(); rowNumber++) {
            const {
                lat,
                latDirection,
                lon,
                lonDirection
            } = this.getRowComponents(rowNumber);

            if (lat.getValue() && lon.getValue()) {
                result.push(this._fromCustomFormat({
                    lat: lat.getValue(),
                    latDirection: latDirection.getValue(),
                    lon: lon.getValue(),
                    lonDirection: lonDirection.getValue(),
                }));
            }
        }

        return result;
    }

    setValue(value) {
        this.value = (value || []).map((coord) => this._toCustomFormat(coord));
        this.clear();

        let rowNumber = 1;
        for (const lineData of this.value) {
            this.addLine();
            this._setLineValue(rowNumber, lineData);
            rowNumber++;
        }

        if (this.value.length === 0) {
            this.addLine();
        }

        if (this.value.length <= 1) {
            this.addLine();
        }

        this.setFirstRowDeleteDisabled();
    }

    _setLineValue(rowNumber, value) {
        const {
            lat,
            latDirection,
            lon,
            lonDirection
        } = this.getRowComponents(rowNumber);
        if (value) {
            lat.setValue(value.lat);
            latDirection.setValue(value.latDirection);
            lon.setValue(value.lon);
            lonDirection.setValue(value.lonDirection);
        }
    }

    setFirstRowDeleteDisabled() {
        const isFirstRowsDisabled = this.disabled || this.getRowCount() <= 2;

        let deleteButton = this.getRowComponents(1).deleteButton;
        if (deleteButton) {
            deleteButton.setDisabled(isFirstRowsDisabled);
        }

        deleteButton = this.getRowComponents(2).deleteButton;
        if (deleteButton) {
            deleteButton.setDisabled(isFirstRowsDisabled);
        }
    }

    _toCustomFormat(coords) {
        const lat = Math.round(coords[1] * 100) / 100;
        const lon = Math.round(coords[0] * 100) / 100;

        return {
            lat: Math.abs(lat),
            latDirection: lat > 0 ? "N" : "S",
            lon: Math.abs(lon),
            lonDirection: lon > 0 ? "E" : "W"
        }
    }

    _fromCustomFormat(coords) {
        return [
            coords.lonDirection === "E" ? coords.lon : - coords.lon,
            coords.latDirection === "N" ? coords.lat : -coords.lat,
        ];
    }
}

export default CoordinatesController;