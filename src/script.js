/**
 * Function Main
 */
//import {settings} from "./utils/settings.js";
import { loadDataCities} from "./DataController.js";
import {Nodo, Graph, Arista} from "./Graph.js";
let data;
async function main(params) {
    console.log("Funcionando!")
    data = await loadDataCities("./data/db_file.json")
    
    let nodoA = new Nodo("A", -74, 4)
    let nodoB = new Nodo("B", -74, 3)
    let nodoC = new Nodo("C", -74, 4)

    let aristaAB = new Arista(nodoA,nodoB, 30, 0.5)
    let aristaAC = new Arista(nodoA, nodoC, 15, 0.1)

    let grafo = new Graph()

    grafo.agregarNodo(nodoA)
    grafo.agregarNodo(nodoB)
    grafo.agregarNodo(nodoC)

    grafo.agregarArista(aristaAB)
    grafo.agregarArista(aristaAC)

    console.log(grafo.getNodos())

}

main()