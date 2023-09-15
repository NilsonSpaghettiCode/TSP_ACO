import { loadDataCities, mapCitiesGraph } from "./DataController.js";
import { DomController } from "./DomController.js";
import { Map } from "./MapController.js";

import { Graph } from "./Graph.js";
import { ACO } from "./Ant.js";

class App {
  constructor() {
    this.dom = {};
    this.grafo = {};
    this.mapa = {};
    this.algoritmo_aco = {};
    this.data = {};
  }
  async init() {
    this.data = await loadDataCities("./data/db_file.json");
    this.grafo = mapCitiesGraph(this.data.ciudades);

    this.mapa = new Map(this.grafo.getNodosObj());
    this.mapa.startMap();

    let ids = [
      "iteraciones_actuales",
      "iteraciones_totales",
      "unidad",
      "Start",
      "Reset",
      "costo"
    ];

    this.dom = new DomController(ids);
    this.dom.startDefaultValues()
    this.dom.addEventsButtons(
      () => this.Start(),
      () => this.Reset()
    );
  
  }
  async Start() {
    console.log(this.grafo);

    this.algoritmo_aco = new ACO(this.grafo);

    this.algoritmo_aco.addSuscriber(this.dom);
    this.algoritmo_aco.addSuscriber(this.mapa);

    this.algoritmo_aco.aprox();
    this.dom.alternateStateBtnStart()
    this.dom.alternateStateBtnReset()
  }


  Reset() {
    console.log("RESET");
    this.grafo = mapCitiesGraph(this.data.ciudades);
    this.dom.alternateStateBtnStart()
    this.dom.alternateStateBtnReset()
    this.dom.reset()
  }
}

export { App };
