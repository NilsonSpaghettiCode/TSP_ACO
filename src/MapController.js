import { settings_map } from "./utils/settings.js";
import { ISuscriber } from "./Interfaces/IObserver.js";
class Map extends ISuscriber {
  constructor(nodos) {
    super();
    this.map = {};
    this.features = [];
    this.nodos = nodos;
    this.polylines = undefined
    this.arrowDecorator = undefined
    this.mark_start = undefined
  }

  update(data) {
    let ant = data.getPath();
    let aristas = ant.getAristas();
    this.setPolyLines(aristas);
  }
  setPolyLines(aristas) {
    console.log()
    if (this.polylines != undefined && this.arrowDecorator != undefined) {
      this.arrowDecorator.remove();
      this.polylines.remove();
      this.mark_start.remove()
    }

    let customIcon = L.icon({
      iconUrl: '../assets/img/bandera.png',
      iconSize: [32, 32], // Tamaño de la imagen en píxeles
      iconAnchor: [16, 32], // Punto de anclaje del icono
    });
  
    this.mark_start = L.marker(aristas[0].getInicio().toLatLen(), { icon: customIcon });
    this.mark_start.addTo(this.map)


    let localizaciones_geograficas = [];
    for (const index in aristas) {
      let arista = aristas[index];
      localizaciones_geograficas.push(arista.getInicio().toLatLen());
      localizaciones_geograficas.push(arista.getFin().toLatLen());
    }

    this.polylines = L.polyline(localizaciones_geograficas, { color: "red" });
    this.polylines.addTo(this.map);

    this.arrowDecorator = L.polylineDecorator(this.polylines, {
      patterns: [
        {
          offset: 25,
          repeat: 50,
          symbol: L.Symbol.arrowHead({
            pixelSize: 10,
            polygon: false,
            pathOptions: { stroke: true, color: "red" },
          }),
        },
      ],
    });
    this.arrowDecorator.addTo(this.map);
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
      let contentPopup = "Ciudad:" + nodo_t.getNombreCiudad();
      let contentTooltip =
        "Aeropuerto: " +
        nodo_t.getNombreAeropuerto() +
        ", Codigo A.I.T.A: " +
        nodo_t.getNombre();
      let feature = L.marker([latitud, longitud]);

      let circle = L.circle([latitud, longitud], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: settings_map.radius_circle,
      });

      circle.bindPopup(contentPopup);
      feature.bindTooltip(contentTooltip);

      this.addFeature(feature);
      this.addFeature(circle);
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
