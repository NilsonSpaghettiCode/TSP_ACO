import {geomath} from "./utils/geomath.js";
class Nodo
{
    constructor(nombre, coordenada)
    {
        this.nombre = nombre
        this.coordenada = coordenada
    }
    getCoordenada() { return this.coordenada }
    getNombre    () { return this.nombre     }
}

class Arista
{
    /**
     * 
     * @param {*} nodo_inicio Objeto del tipo Nodo
     * @param {*} nodo_fin Objeto del tipo Nodo
     * @param {*} peso 
     * @param {*} feromona 
     */
    constructor(nodo_inicio, nodo_fin, feromona)
    {
        this.nodo_inicio = nodo_inicio
        this.nodo_fin = nodo_fin

        this.peso = geomath.haversine(nodo_inicio.getCoordenada(),nodo_fin.getCoordenada())
        this.feromona = feromona
    }

    
    getInverso ()         { return new Arista(this.nodo_fin, this.nodo_inicio, this.feromona)}
    
    setFeromona(feromona) { this.feromona = feromona}
    getFeromona()         { return this.feromona}
    
    getInicio(){ return this.nodo_inicio }
    getFin   (){ return this.nodo_fin    }
    getPeso  (){ return this.peso        }
    
 
}
/**
 * Permite crear un Grafo con aristas que no tienen direccion
 */
class Graph
{
    constructor()
    {
        this.nodos = {}
    }

    agregarNodo(nodo)
    {
        this.nodos[nodo.getNombre()] = []
    }

    agregarArista(arista)
    {
        this.nodos[arista.getInicio().getNombre()].push(arista)
        this.nodos[arista.getFin().getNombre()].push(arista.getInverso())
    }

    nodoEnGrafo(nombre_nodo){
        if (this.nodos[nombre_nodo] != undefined) {
            return true
        }
        return false
    }

    getNodosVecinos(nombre_nodo){
        let vecinos = undefined
        if (this.nodoEnGrafo(nombre_nodo)) {
           vecinos = this.nodos[nombre_nodo]
        }
        return vecinos
    }
    getNodos(){ return this.nodos}
}


export {Graph, Nodo, Arista}