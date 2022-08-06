
import { View, Feature } from "ol";
import { fromLonLat, transform } from "ol/proj";
import { containsXY } from 'ol/extent';
import { Point, MultiLineString } from 'ol/geom'
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style, Stroke } from "ol/style";

import { Tile as TileLayer } from "ol/layer";
import TileWMS from "ol/source/TileWMS";

class RouteMapWrapper {

    constructor(epcsMap) {
        this.layer = null;
        this.map = null;
        this.feature = null;
        this.initParameters = false;

        const oldInt = epcsMap.init;
        epcsMap.init = () => {

            oldInt.bind(epcsMap)();
            setTimeout(() => {
                this.afterInit(epcsMap);
            });
        }
    }

    afterInit(epcsMap) {
        this.map = epcsMap.map;
        this._addIceLayer();

        if (this.initParameters && this.layer) {

            this.map.addLayer(this.layer);

            if (this.initParameters.ensureVisibleCoordinates) {
                this.ensureVisible(this.initParameters.ensureVisibleCoordinates);
            }

            if (this.initParameters.fit && this.feature) {
                this.fit();
            }
            this.initParameters = null;
        }
    }

    _addIceLayer() {

        const { TileWMSURL = "http://51.250.101.170:8600/geoserver/cmi/wms?", TileWMSURLVersion = "1.1.0" } = process.env;

        //пример запроса
        //http://51.250.101.170:8600/geoserver/cmi/wms
        //?service=WMS&version=1.1.0&request=GetMap
        //&layers=cmi%3Aice_types
        //&bbox=-180.0%2C65.4363809043385%2C180.0%2C85.0088935946637&width=768&height=330&srs=EPSG%3A4326&format=application/openlayers

        const newLayer = new TileLayer({
            source: new TileWMS({
                url: TileWMSURL,
                params: {
                    'LAYERS': `cmi:ice_types`,
                    'VERSION': TileWMSURLVersion,
                    'TRANSPARENT': true,
                    'TILED': true,
                },
                serverType: 'geoserver',
                transition: 0,
            }),
        });

        this.map.addLayer(newLayer);
    }

    getMap() {
        return this.map;
    }

    clear() {
        if (this.map && this.layer) {
            this.map.removeLayer(this.layer);
        }
    }

    addMultiLineString(coords) {

        const flatPoints = coords.map(point => {
            return fromLonLat(point);
        })

        this.feature = new Feature({
            geometry: new MultiLineString([flatPoints], {}),
        });

        this.feature.getGeometry().setCoordinates([flatPoints]);

        const source = new VectorSource({
            features: [this.feature],
        });

        this.layer = new VectorLayer({
            opacity: 0.5,
            source: source,
            style: new Style({
                stroke: new Stroke({
                    color: "#325a8f",
                    width: 1.6,
                })
            },
            )
        });

        if (this.map) {
            this.map.addLayer(this.layer);
        }
        else {
            this.initParameters = {};
            //выполнится в init()
        }
    }

    addPoint(coords) {

        const feature = new Feature({
            geometry: new Point(fromLonLat(coords)),
        });

        feature.setStyle(new Style({
            image: new Icon({
                src: require("../../assets/pointClick.svg"),
            }),
        }));

        this.layer = new VectorLayer({
            source: new VectorSource({
                features: [feature],
            }),
            zIndex: 5
        });

        if (this.map) {
            this.map.addLayer(this.layer);
        }
    }

    fit() {

        if (!this.map) {
            if (this.initParameters) {
                this.initParameters.fit = true;
                //выполнится в init()
            }
            return;
        }

        this.map.getView().fit(this.feature.getGeometry(), { padding: [8, 8, 8, 8] });
    }

    ensureVisible(lonLatCoords) {

        if (!this.map) {
            if (this.initParameters) {
                this.initParameters.ensureVisibleCoordinates = lonLatCoords;
                //выполнится в init()
            }
            return;
        }

        //если точки не помещаются на текущей карте 
        //- попробовать поправить центрирование и/или зум
        const coords = lonLatCoords.map((coord) => fromLonLat(coord));
        let extent = this.map.getView().calculateExtent(this.map.getSize());

        let notVisiblePoints = coords
            .filter((coord) => !containsXY(extent, coord[0], coord[1]));

        if (notVisiblePoints.length === 0) {
            return;
        }

        //1. смещение центра

        //TODO смещать по минимуму

        const _getCenterPoint = (coords) => {

            const maxX = Math.max(...coords.map((coord) => coord[0]));
            const minX = Math.min(...coords.map((coord) => coord[0]));

            const maxY = Math.max(...coords.map((coord) => coord[1]));
            const minY = Math.min(...coords.map((coord) => coord[1]));

            return [(maxX + minX) / 2, (maxY + minY) / 2];
        }

        this.map.setView(new View({
            ...this.map.getView().values_,
            center: _getCenterPoint(coords),
        }));

        this.map.updateSize();

        // extent = this.map.getView().calculateExtent(this.map.getSize());

        // notVisiblePoints = coords
        //   .filter((coord) => !containsXY(extent, coord[0], coord[1]));

        // if (notVisiblePoints.length === 0) {
        //   return;
        // }

        //TODO тогда уменьшаем zoom

    }
}

export default RouteMapWrapper;
