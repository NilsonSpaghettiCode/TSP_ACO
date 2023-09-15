import { ISuscriber } from "./Interfaces/IObserver.js";
import { settings_dom, settings_aco } from "./utils/settings.js";

class DomController extends ISuscriber {
  constructor(ids) {
    super();
    this.ids = ids; //Lista
    this.elements = {};
  }

  update(data) {
    this.setIteration_actual(data.getIteration());
    this.setCosto(data.getPath().getCost());
    this.setDataTable(data.getPath());
  }

  setDataTable(data) {
    let caminos = data.aristas;
    let table = this.elements[settings_dom.id_table_data];

    let trs = table.querySelectorAll("tr");
    //console.log(typeof(trs))

    for (const element of trs) {
      if (element.children[0].tagName != "TH") {
        element.parentNode.removeChild(element)
      }
    }
    for (let index = 0; index < caminos.length; index++) {
      const camino = caminos[index];
      let tr_i = this.createElementsTable(index, camino);
      table.appendChild(tr_i);
    }
  }

  createElementsTable(id, data) {
    let nodo_inicio = data.getInicio();
    let nodo_fin = data.getFin();
    let tr_i = document.createElement("tr");

    let td_id = document.createElement("td");
    let td_ciudad_inicio = document.createElement("td");
    let td_ciudad_aeropuerto = document.createElement("td");

    let td_ciudad_destino = document.createElement("td");
    let td_ciudad_aeropuerto_fin = document.createElement("td");

    let td_distancia = document.createElement("td");
    let td_retraso = document.createElement("td");
    let td_costo = document.createElement("td");

    td_id.textContent = id;
    td_ciudad_inicio.textContent = nodo_inicio.getNombreCiudad();
    td_ciudad_aeropuerto.textContent = nodo_inicio.getNombreAeropuerto();

    td_ciudad_destino.textContent = nodo_fin.getNombreCiudad();
    td_ciudad_aeropuerto_fin.textContent = nodo_fin.getNombreAeropuerto();

    td_distancia.textContent = data.getDistancia().toFixed(2);
    td_retraso.textContent = data.getTiempo().toFixed(2);
    td_costo.textContent = data.getPeso().toFixed(2);

    tr_i.appendChild(td_id);
    tr_i.appendChild(td_ciudad_inicio);
    tr_i.appendChild(td_ciudad_aeropuerto);
    tr_i.appendChild(td_ciudad_destino);
    tr_i.appendChild(td_ciudad_aeropuerto_fin);
    tr_i.appendChild(td_distancia);
    tr_i.appendChild(td_retraso);
    tr_i.appendChild(td_costo)

    return tr_i;
  }

  setIteration_actual(iteracion) {
    this.elements[settings_dom.id_iteracion_i].textContent = iteracion + 1;
  }

  setCosto(costo) {
    this.elements[settings_dom.id_costo].textContent = costo.toFixed(2);
  }

  setIterationMaxima() {
    this.elements[settings_dom.id_iteraciones_max].textContent =
      settings_aco.max_iterations;
  }

  addEventsButtons(function_start, function_reset) {
    this.elements[settings_dom.btn_start].addEventListener(
      "click",
      function_start
    );
    this.elements[settings_dom.btn_reset].addEventListener(
      "click",
      function_reset
    );
  }

  startDefaultValues() {
    this.setElements();
    this.setIterationMaxima();
    this.alternateStateBtnReset();
    this.setVelocidadBase();
    this.setUnidad()
  }

  setUnidad()
  {
    this.elements[settings_dom.id_unidad].textContent = settings_aco.unidad
  }

  setVelocidadBase()
  {
    this.elements[settings_dom.id_velocidad_base].textContent = settings_aco.velocidad_base
  }

  reset() {
    this.setIteration_actual(-1);
  }

  alternateStateBtnStart() {
    let state = this.elements[settings_dom.btn_start].disabled;
    if (state) {
      this.elements[settings_dom.btn_start].disabled = false;
    } else {
      this.elements[settings_dom.btn_start].disabled = true;
    }
  }

  alternateStateBtnReset() {
    let state = this.elements[settings_dom.btn_reset].disabled;
    if (state) {
      this.elements[settings_dom.btn_reset].disabled = false;
    } else {
      this.elements[settings_dom.btn_reset].disabled = true;
    }
  }

  setElements() {
    for (const index in this.ids) {
      let _id = this.ids[index];
      let element = this.getElementById(_id);
      this.elements[_id] = element;
    }
  }
  getElementById(id) {
    return document.getElementById(id);
  }
}

export { DomController };
