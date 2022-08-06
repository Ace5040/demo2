import Point from 'ol/geom/Point';
import Feature from "ol/Feature";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import {iconsTypes} from "./objects/shipTypes";
import {degToRad} from "../tools/tools";
import VectorSource from "ol/source/Vector";
import {Vector as VectorLayer} from "ol/layer";

export default class TrackingModeShip {
    constructor(dataShip, map) {
        this._ship = dataShip.ship;
        this._track = dataShip.track;
        this._map = map;
        this._trackigZoom = 8;
        this._updateTime = 5000;//(1000 * 60) * 2;
        this._activeUpdateTime = null;
        this.vlFeature = null;

        this._initTrackMode();
    }

    _initTrackMode() {
        let feature = new Feature({
            geometry: new Point(this._ship.getPosition()),
        });

        let style = new Style({
            image: new Icon({
                src: iconsTypes["TRACK_MODE"],
            }),
        });

        feature.setStyle(style);

        let vsFeature = new VectorSource({
            features: [feature],
        });

        this.vlFeature = new VectorLayer({
            source: vsFeature,
            zIndex: 6
        });

        this._map.getMap().addLayer(this.vlFeature)
        this._startTrackingMode();
    }

    _startTrackingMode() {
        this._activeUpdateTime = setInterval(() => {
            this._map.setNewView({
                center: this._ship.getPosition(),
                zoom: this._trackigZoom,
            });
        }, this._updateTime)
    }

    stopTrackingMode() {
        clearInterval(this._activeUpdateTime);
        this._map.getMap().removeLayer(this.vlFeature)
    }
}
