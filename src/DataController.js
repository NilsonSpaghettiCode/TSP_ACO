import { Graph, Nodo, Arista } from "./Graph.js";
import { Coordinate } from "./utils/basic.js";
/**
 *
 * @param {*} request_address url or address
 * @returns Return object of data with cities
 */
async function loadDataCities(request_address) {
  let data = {};
  try {
    data = (await fetch(request_address)).json();
  } catch (error) {
    console.error(error);
  }
  return data;
}

function mapCitiesGraph(cities) {

  let graph = new Graph();
  let nodos = [];

  for (let i in cities) {
    let city = cities[i];
    let aeropuerto = city.aeropuerto;
    let nodo = new Nodo(
      aeropuerto.codigo_iata,
      new Coordinate(aeropuerto.latitud, aeropuerto.longitud)
    );
    nodos.push(nodo);
    graph.agregarNodo(nodo);
  }

  for (let index = 0; index < nodos.length; index++) {
    const nodo_i = nodos[index];
    let nodos_vecinos = Array.from(nodos);
    nodos_vecinos.splice(index,1)
    //console.log("Nodo #i:", nodo_i, "Nodos:", nodos_vecinos)

    for (let index = 0; index < nodos_vecinos.length; index++) {
      const nodo_f = nodos_vecinos[index];
      let arista_i = new Arista(nodo_i, nodo_f);
      graph.agregarArista(arista_i);
    }
  }

  return graph;
}



export { loadDataCities, mapCitiesGraph };
