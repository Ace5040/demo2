import LineString from 'ol/geom/LineString';
import Feature from "ol/Feature";
import { fromLonLat } from 'ol/proj';
import {Vector as VectorLayer} from "ol/layer";
import VectorSource from "ol/source/Vector";
import {Icon, Style, Fill, Text, Stroke} from "ol/style";
import ShipAis from "./ShipAis";

export default class ShipTrack extends LineString {
    constructor(coordinates, layout, track, map) {
        super(fromLonLat(coordinates), layout);

        // Протянул карту, так как тут создаются АИС маркеры
        this.className = 'ShipTrack';
        this._map = map;
        this._track = track;
        this._coordsArray = [];
        this._featureTrack = null;
        this._styleTrack = null;
        this._vectorSourceTrack = null;
        this.vectorLayerTrack = null;
        this._aisMarkers = {};
        this._color = this._setRandomRGB();

        return this._initGeometry();
    }

    getClassName() {
        return this.className;
    }

    _initGeometry() {
        this._coordsArray = [];
        this.updateTrack(this._track);
        this._setFeature();
        this._setStyle();
        this._setVectorStyle()

        this.vectorLayerTrack = new VectorLayer({
            source: this._vectorSourceTrack,
            zIndex: 0
        });
    }

    getVectorLayer() {
       return this.vectorLayerTrack;
    }

    _setFeature() {
        this._featureTrack = new Feature({
            geometry: this
        });
    }

    _setStyle() {
        let {R, G, B} = this._color;
        this._styleTrack = new Style({
            stroke: new Stroke({
                color: `rgb(${R},${G},${B})`,
                width: 1.6,
            })
        })
        this._featureTrack.setStyle(this._styleTrack);
    }

    _setRandomRGB() {
        let R = Math.floor(Math.random() * 250)
        let G = Math.floor(Math.random() * 250)
        let B = Math.floor(Math.random() * 250)
        return { R, G, B }
    }

    _setVectorStyle() {
        this._vectorSourceTrack = new VectorSource({
            features: [this._featureTrack]
        });
    }

    updateTrack(track) {
        // Временный итератор для обрезки треков, убрать при переходе на нормальное АПИ.
        let iterator = 0;
        Object.values(track).forEach(item => {
            const {lon, lat, hid } = item;
            item.color = this._color;
            this._coordsArray.push(fromLonLat([item.lon, item.lat]))
            if((iterator % 20) === 0) {
                this._aisMarkers[hid] = new ShipAis([lon, lat], {}, item)
                this._map.addLayer(this._aisMarkers[hid].getLayer())
            }
            iterator++
        })
        this.setCoordinates(this._coordsArray)
    }

}
