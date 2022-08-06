import Component from "./Component"

import {Tile as TileLayer, VectorTile as VectorTileLayer} from "ol/layer"
import { Map, View, Feature } from "ol";
import { OSM, VectorTile as VectorTileSource, XYZ } from "ol/source";
import { fromLonLat } from "ol/proj";
import { containsXY } from 'ol/extent';

import { Polygon, Point, MultiLineString } from 'ol/geom'
import { register } from "ol/proj/proj4";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style, Fill, Text, Stroke, Circle as CircleStyle } from "ol/style";

class EPCSMap extends Component {
    constructor(dataComponent) {
        super(dataComponent)
        this.nameTemplate = 'EPCSMap'
        this.map = null;
        this.baseLayer = null;
        this.col = dataComponent.col
        this.props = {
            data: {
                mapId: 'map01',
                allLayers: [],
                layerToSend: {}
            }
        }
        this.validateView = ['center', 'zoom'];
        this.validateProps = ['mapId']
        this._setPropsBeforeCreate(dataComponent)
    }

    _setPropsBeforeCreate(dataComponent) {
        const strProps = dataComponent.props
        this.validateProps.forEach((prop) => {
            if (strProps[prop]) this.props.data[prop] = strProps[prop]
        });
    }

    getComponentName() {
        return this.nameTemplate
    }

    _addIceLayer() {
      const { TileWMSURL = "http://51.250.101.170:8600/geoserver/cmi/wms?", TileWMSURLVersion = "1.1.0" } = process.env;
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


    getProps() {
        return this.props.data
    }

    getInstance() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.map))
        });
    }

    getMap() {
        return this.map;
    }

    setNewView(viewsParameters) {
        // Все параметры описаниы в классе View https://openlayers.org/en/latest/apidoc/module-ol_View-View.html
        // Добалвяя сюда параметры, пожалуйста, проверяйте их наличие в this.validateView
        let newValueView = {};
        Object.keys(viewsParameters).forEach(key => {
            if(this.validateView.includes(key)) newValueView[key] = viewsParameters[key]
        })
        this.map.setView(new View(viewsParameters))
    }

    init(){
        this.map = new Map({
            target: this.props.data.mapId,
            layers: [],
            controls: []
        })

        this.map.setView(new View( {
            center: fromLonLat([80.2, 71.2]),
            zoom: 5,
            minZoom: 5,
            maxZoom: 16
        }))

        this.baseLayer = new TileLayer({
            source: new OSM({
                crossOrigin: "Anonymous"
            })
        })
        this.map.addLayer(this.baseLayer);

        if (this.layer) {
            this.map.addLayer(this.layer);
      
            if (this.checkCoordinates) {
              this.correctView(this.checkCoordinates);
              this.checkCoordinates = null;
            }
          }
    }

    clear() {
        if (this.layer) {
          this.map.removeLayer(this.layer);
        }
      }
    
      getMap() {
        return this.map;
      }
    
      setNewView(viewsParameters) {
        this.map.setView(new View(viewsParameters))
      }
    
      correctView(lonLatCoords) {
        //если точки не помещаются на текущей карте 
        //- попробовать поправить центрирование и/или зум
        const coords = lonLatCoords.map((coord) => fromLonLat(coord));
        let extent = this.map.getView().calculateExtent(this.map.getSize());
    
        let notVisiblePoints = coords
          .filter((coord) => !containsXY(extent, coord[0], coord[1]));
    
        if (notVisiblePoints.length === 0) {
          return;
        }
    
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
    
      addMultiLineString(coords, checkZoomOrPosition) {
    
        let points = coords;
    
        let flatPoints = points.map(point => {
          return fromLonLat(point);
        })
    
        const feature = new Feature({
          geometry: new MultiLineString([flatPoints], {}),
        });
    
        feature.getGeometry().setCoordinates([flatPoints]);
    
        let source = new VectorSource({
          features: [feature],
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
    
          if (checkZoomOrPosition) {
            this.correctView(coords);
          }
        }
        else {
          this.checkCoordinates = coords;
          //выполнится в init()
        }
    
        return feature;
      }
    
      addPoint(coords, checkZoomOrPosition) {
    
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
    
          if (checkZoomOrPosition) {
            this.correctView([coords]);
          }
        }
        else {
          this.checkCoordinates = [coords];
          //выполнится в init()
        }
      }

}

export default EPCSMap