/**
 * Function Main
 */
//import {settings} from "./utils/settings.js";
import { loadDataCities, mapCitiesGraph} from "./DataController.js";
import {Nodo, Graph, Arista} from "./Graph.js";
import { ACO } from "./Ant.js";


let data = {};
async function main(params) {
    console.log("Funcionando!")
    data = await loadDataCities("./data/db_file.json")

    let grafo = new Graph()
    grafo = mapCitiesGraph(data.ciudades)
    grafo.verGrafo()
    
    let algoritm_aco = new ACO(grafo)
    algoritm_aco.aprox()

    

}

main()


/**
     * let nodoA = new Nodo("EZE", new Coordinate(-34.8128, -58.5422))
    let nodoB = new Nodo("COR", new Coordinate(-31.3152, -64.2080))
    let nodoC = new Nodo("C", new Coordinate(-32.905, -60.7859))

    let aristaAB = new Arista(nodoA,nodoB, 0.5)
    let aristaAC = new Arista(nodoA, nodoC, 0.1)

    let grafo = new Graph()

    grafo.agregarNodo(nodoA)
    grafo.agregarNodo(nodoB)
    grafo.agregarNodo(nodoC)

    grafo.agregarArista(aristaAB)
    grafo.agregarArista(aristaAC)
    console.log(grafo.getNodos())
     * 
     */