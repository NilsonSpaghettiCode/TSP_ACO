import { settings_map } from "./utils/settings.js";
class Map {
  constructor(nodos) {
    this.map = {};
    this.features = [];
    this.nodos = nodos;
  }

  initMap(
    lat = settings_map.initial_lat,
    lon = settings_map.initial_lon,
    zoom = settings_map.zoom
  ) {
    this.map = L.map(settings_map.idMap, { center: [lat, lon], zoom: zoom });
  }

  setTileLayer(max_zoom = settings_map.zoom) {
    let tile_layer = L.tileLayer(settings_map.urlTemplate, {
      maxZoom: max_zoom,
      attribution: settings_map.atribution,
    });

    this.addFeature(tile_layer);
  }

  setMarks() {
    for (const i in this.nodos) {
      let nodo_t = this.nodos[i];
      let cordenada = nodo_t.getCoordenada();

      let latitud = cordenada.getLatitude();
      let longitud = cordenada.getLongitude();
      let contentPopUp = "Ciudad:" + nodo_t.getNombreCiudad() + ", Aeropuerto: " + nodo_t.getNombreAeropuerto() +", Codigo A.I.T.A: " + nodo_t.getNombre();

      let feature = L.marker([latitud, longitud]);

      let circle = L.circle([latitud, longitud], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: settings_map.radius_circle,
      });
      feature.bindPopup(contentPopUp);

      this.addFeature(feature);
      this.addFeature(circle)
    }
  }

  addFeature(feature) {
    this.features.push(feature);
  }

  showMap() {
    for (let index = 0; index < this.features.length; index++) {
      let feature = this.features[index];
      feature.addTo(this.map);
    }
  }

  startMap() {
    this.initMap();
    this.setTileLayer();
    this.setMarks();
    this.showMap();
  }
}

export { Map };
