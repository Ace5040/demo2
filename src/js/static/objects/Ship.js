import EPCSPoint from '../EPCSPoint'
import Feature from "ol/Feature";
import {Icon, Style, Fill, Text, Stroke} from "ol/style";
import VectorSource from "ol/source/Vector";
import {Vector as VectorLayer} from "ol/layer";
import { degToRad } from "../../tools/tools";
import { Cluster } from 'ol/source';
import { fromLonLat } from 'ol/proj';


import { iconsTypes } from "./shipTypes"


export default class Ship extends EPCSPoint {
    constructor(coordinates, options, state) {
        super(fromLonLat(coordinates), options)

        this.className = 'Ship';
        this._LonLat = coordinates;
        this._coords = fromLonLat(coordinates);
        this._name = this._getClearName(state.name);
        this._nameLat = this._getClearName(state.name_lat);
        this._imo = state.imo;
        this._course = state.course;
        this._vesselType = this._getClearType(state.vessel_type);
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
        return new Style({
            image: new Icon({
                src: iconsTypes[String(this._vesselType)],
                rotation: degToRad(this._course),
            }),
            text: new Text({
                text: this._name || this._nameLat,
                offsetX: 14,
                textAlign: 'left',
                placement: 'point',
                scale: 1.1,
                stroke: new Stroke({
                    color: "#ffffff",
                    width: 1
                }),
                fill: new Fill({
                    color: '#000000'
                }),
            }),
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
            zIndex: 5
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

    _getClearName(name) {
        if((!name.includes('null') && !name.includes('NULL')) && name) {
            return String(name).toUpperCase();
        } else {
            return ''
        }
    }

    _getClearType(type) {
        if(type && (!type.includes('null') && !type.includes('NULL'))) {
            return String(type).toUpperCase();
        } else {
            return 'undefined'
        }
    }

    updateState(coords, {}, state) {
        this.setCoordinates(fromLonLat(coords))
        // Тут мы передаём все обновленные данные и вызывваем методы для их обновления.

        this._name = this._getClearName(state.name);
        this._nameLat = this._getClearName(state.name_lat);
        this._imo = state.imo;
        this._course = state.course;
        this._coords = fromLonLat(coords)


        this.iconStyle = this._setInstanceStyle()
        this.iconFeature.setStyle(this.iconStyle);
    }

    getFeature() {
        return this.iconFeature;
    }
}
