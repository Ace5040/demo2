// Тут пишем бизнес-логику, в зависимости от того что нам нужно
// соблюдая паттерны проектирования.
// import { getShipsPosition, getTrackForShip } from "../../api/index"
import Marker from "../../js/static/objects/Marker";
// import ShipTrack from "../../js/static/objects/ShipTrack";
// import TrackingModeShip from "../../js/static/TrackingModeShip";
import { Cluster, OSM, Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";
import { transform } from "ol/proj";
import { getCustomCoorinates, setCustomCoorinates } from "../../js/tools/map";
class Map {
  constructor(form, Vue) {
    console.log("🚀 ~ file: Map.js ~ line 13 ~ Map ~ constructor ~ form", form);
    this.form = form;
    this.nameMap = "EPCS" + form.metaData.nameForm + "Map";

    this.formMap = this.form.getComponentByName(this.nameMap).component;
    this.$Vue = Vue;
    this.allMarkers = {};
    this.store = this.$Vue.store;
    this.map = null;
    this.getInstanceMap = this.formMap.getInstance();
    this.getInstanceMap.then((mapInstance) => {
      mapInstance.updateSize();
      this._eventsOnMap(mapInstance);
    });
    Vue.$bus.$on("changeCoords", (e) => {
      let components = e;
      this.getInstanceMap.then((e) => this.changeCoords(components));
    });
  }

  _eventsOnMap(map) {
    this.map = map;
    map.on("click", (evt) => {
      let coords = evt.coordinate;
      const nameMarker = this.store.getters[this.getStoreName("nameMarker")];
      if (nameMarker && !this.form.metaData.disabled) {
        let marker = this.allMarkers[nameMarker];
        if (marker) {
          marker.updateState(coords);
        } else {
          this.allMarkers[nameMarker] = new Marker(coords);
          map.addLayer(this.allMarkers[nameMarker].getLayer());
        }
        this.setValuesLatitude(coords);
      }
    });
  }

  changeCoords(components) {
    this.getInstanceMap.then((mapInstance) => {
      let coords = getCustomCoorinates(components);
      coords = transform(coords, "EPSG:4326", "EPSG:3857");
      const nameMarker = components[0].component.name,
        marker = this.allMarkers[nameMarker];

      let filledCoords = coords.filter((el) => el);
      if (filledCoords.length === 2) {
        if (!this.allMarkers[nameMarker]) {
          this.allMarkers[nameMarker] = new Marker(coords);
          this.map.addLayer(this.allMarkers[nameMarker].getLayer());
          this.allMarkers[nameMarker].updateState(coords);
        } else {
          marker.updateState(coords);
        }
        this.viewMap(nameMarker);
      }
    });
  }

  fillCoords(e) {
    let name = e.event,
      nameCoords = `EPCS${name}`,
      id = e.value,
      elemCoords = this.$Vue.store.getters[this.getStoreName("allPorts")][id];

    if (elemCoords) {
      let coords = elemCoords.sgeomlocation.coordinates.map((el) => el.toFixed(2));
      let coordsInputs = this.form.getComponentByName(nameCoords).components,
        lat = coordsInputs[0].component,
        routeLat = this.form.getComponentByName(`${nameCoords}Lat`).component,
        lon = coordsInputs[2].component,
        routeLon = this.form.getComponentByName(`${nameCoords}Lon`).component;

      setCustomCoorinates(lat, routeLat, coords);
      setCustomCoorinates(lon, routeLon, coords);
    }
  }

  viewMap(nameMarker) {
    this.formMap.setNewView({
      center: this.allMarkers[nameMarker].getPosition(),
      zoom: 5,
    });
  }

  setValuesLatitude(coords) {
    const nameMarker = this.store.getters[this.getStoreName("nameMarker")];
    let formLat = this.form.getComponentByName(nameMarker),
      shortCoords = transform(coords, "EPSG:3857", "EPSG:4326").map((el) => +el.toFixed(2));

    formLat.components.forEach((component, idx) => {
      let name = component.component.getName();
      if (name.substr(0, 4) !== "EPCS") {
        if (name.toLowerCase().includes("lat") || name.toLowerCase().includes("lon")) {
          let elem = this.form.getComponentByName(name).component;
          let route = this.form.getComponentByName(`EPCS${name}`).component;
          setCustomCoorinates(elem, route, shortCoords);
        }
      }
    });
  }

  getStoreName(name) {
    return `dispStore/${name}`;
  }
}

export default Map;
