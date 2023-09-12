import {geomath} from "./utils/geomath.js";
import {randomHour} from "./utils/functions.js";
import {  settings_aco } from "./utils/settings.js";

class Nodo
{
    constructor(nombre, coordenada) //FALTA AGREGAR VARIABLE DE TIEMPO
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
    constructor(nodo_inicio, nodo_fin, feromona=settings_aco.initial_feromone) //FALTA SUMAR VARIABLE DE TIEMPO A PESO
    {
        this.nodo_inicio = nodo_inicio
        this.nodo_fin = nodo_fin
        
        this.tiempo = randomHour(3600, 7200)
        this.peso = geomath.haversine(nodo_inicio.getCoordenada(),nodo_fin.getCoordenada()) + this.tiempo
        
        this.visibilidad = 1/ this.peso
        this.feromona = feromona

        this.visibilidad_feromona = 0
        this.Pxy = 0
    }

    
    getInverso ()         { return new Arista(this.nodo_fin, this.nodo_inicio, this.feromona)}
    
    setPxy(value){ this.Pxy = value }
    getPxy()     { return this.Pxy  }
    
    setVisibilidadFeromona(value) { this.visibilidad_feromona = value }
    getVisibilidadFeromona()      { return this.visibilidad_feromona }
    
    setFeromona(feromona) { this.feromona = feromona}
    getFeromona()         { return this.feromona}
    
    setVisibilidad(visibilidad) { this.visibilidad = visibilidad }
    getVisibilidad() { return this.visibilidad }

    getInicio(){ return this.nodo_inicio }
    getFin   (){ return this.nodo_fin    }
    getTiempo(){ return this.tiempo      }
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
        //this.nodos[arista.getFin().getNombre()].push(arista.getInverso())
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

    verGrafo()
    {
        console.log(this.nodos)
    }
}


export {Graph, Nodo, Arista}