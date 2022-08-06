import 'ol/ol.css';
import { transform } from 'ol/proj'
import Draw from 'ol/interaction/Draw';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';


class MultiLineString {

    constructor(Vue) {

        this.$Vue = Vue
        this.raster = new TileLayer({
            source: new OSM(),
        });
        this.source = new VectorSource({ wrapX: false });
        this.vector = new VectorLayer({
            source: this.source,
        });

        this.current = [];

        this.draw = new Draw({
            source: this.source,
            type: "MultiLineString",
            stopClick: true,
            condition: (e) => {
                this.current.push(e.coordinate);
                return true;
            }
        });

        this.draw.on("drawend", function (e) {
            let points = e.feature.values_.geometry.flatCoordinates;
            points = e.feature.getGeometry().getCoordinates();

            let returnPoints = points[0].map(coords => {
                return transform(coords, 'EPSG:3857', 'EPSG:4326')
            });

            this.current = [];

            Vue.$bus.$emit("drawEnd", returnPoints)
        });

    }

    getMarker() {
        return this.draw;
    }

    getCurrentValue() {
        return this.current;
    }
}

export default MultiLineString;