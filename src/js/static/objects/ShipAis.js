import {fromLonLat} from "ol/proj";
import EPCSPoint from "../EPCSPoint";
import Feature from "ol/Feature";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import {iconsTypes} from "./shipTypes";
import {degToRad} from "../../tools/tools";
import VectorSource from "ol/source/Vector";
import {Vector as VectorLayer} from "ol/layer";

export default class ShipAis extends EPCSPoint {
    constructor(coordinates, options, state) {
        super(fromLonLat(coordinates), options)

        this.className = 'ShipAis';
        this._LonLat = coordinates;
        this._coords = fromLonLat(coordinates);
        this._course = state.course;
        this._color = state.color;
        this.iconFeature = null;
        this.iconStyle = null;
        this.vectorSource = null;
        this.vectorLayer = null;
        this.state = state;

        return this._initMarker()
    }

    getClassName() {
        return this.className;
    }

    getPosition() {
        return this._coords;
    }

    _initMarker() {
        this._setInstanceFeatureAndStyle();
        this.vectorSource = this._setInstanceVectorSource();
        this.vectorLayer = this._setInstanceVectorLayer();
    }

    _setInstanceFeature() {
        return new Feature({
            geometry: this,
        });
    }

    _setInstanceStyle() {
        let {R, G, B} = this._color;
        return new Style({
            image: new Icon({
                color: `rgb(${R}, ${G}, ${B})`,
                src: iconsTypes['AIS'],
                rotation: degToRad(this._course),
            })
        });
    }

    getState() {
        return this.state;
    }

    _setInstanceVectorSource() {
        return new VectorSource({
            features: [this.iconFeature],
        });
    }

    _setInstanceVectorLayer() {
        return new VectorLayer({
            source: this.vectorSource,
            zIndex: 2
        });
    }

    _setInstanceFeatureAndStyle() {
        this.iconFeature = this._setInstanceFeature();
        this.iconStyle = this._setInstanceStyle()
        this.iconFeature.setStyle(this.iconStyle);
    }

    getLayer() {
        return this.vectorLayer;
    }
}
