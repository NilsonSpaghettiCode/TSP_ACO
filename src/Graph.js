import { geomath } from "./utils/geomath.js";
import { randomHour } from "./utils/functions.js";
import {  settings_aco } from "./utils/settings.js";

class Nodo
{
    constructor(nombre, coordenada, nombre_aeropuerto, nombre_ciudad)
    {
        this.nombre = nombre
        this.coordenada = coordenada
        this.nombre_aeropuerto = nombre_aeropuerto
        this.nombre_ciudad = nombre_ciudad
    }
    getCoordenada() { return this.coordenada        }
    getNombre    () { return this.nombre            }
    
    getNombreAeropuerto() { return this.nombre_aeropuerto }
    getNombreCiudad    () { return this.nombre_ciudad     }
}

class Arista
{
    /**
     * 
     * @param {*} nodo_inicio Objeto del tipo Nodo
     * @param {*} nodo_fin Objeto del tipo Nodo 
     * @param {*} feromona 
     */
    constructor(nodo_inicio, nodo_fin, feromona=settings_aco.initial_feromone) //FALTA SUMAR VARIABLE DE TIEMPO A PESO
    {
        this.nodo_inicio = nodo_inicio
        this.nodo_fin = nodo_fin
        
        this.tiempo = randomHour(3600, 7200)
        this.distancia = geomath.haversine(nodo_inicio.getCoordenada(),nodo_fin.getCoordenada())
        this.peso =  (this.distancia) // Da lugar a una velocidad V=D/T
        
        this.visibilidad = 1/ this.peso
        this.feromona = feromona

        this.visibilidad_feromona = 0
        this.Pxy = 0

        this.evaporacion_feromona = 0 //No es la constante
        this.total_aporte_feromonal = 0 //Cantidad de feromona a aumentar de acuerdo a la evaporacion y el aporte de las hormigas
    }

    
    getInverso() { return new Arista(this.nodo_fin, this.nodo_inicio, this.feromona)}
    
    setPxy(value){ this.Pxy = value }
    getPxy()     { return this.Pxy  }
    
    setVisibilidadFeromona(value) { this.visibilidad_feromona = value }
    getVisibilidadFeromona()      { return this.visibilidad_feromona }
    
    setFeromona(feromona) { this.feromona = feromona}
    getFeromona()         { return this.feromona}
    
    setVisibilidad(visibilidad) { this.visibilidad = visibilidad }
    getVisibilidad() { return this.visibilidad }

    getInicio() { return this.nodo_inicio }
    getFin   () { return this.nodo_fin    }

    getTiempo() { return this.tiempo      }
    getPeso  () { return this.peso        }
    getDistancia() { return this.distancia}
    
    getNombre() { return (this.nodo_inicio.getNombre()+"_"+this.nodo_fin.getNombre())}
    
    resetContribucionTotal()
    {
        this.total_aporte_feromonal = 0
    }
    getContribucionTotal()
    {
        return this.total_aporte_feromonal;
    }

    agregarContribucionFeromona(nuevo_aporte_hormiga)
    {
        this.total_aporte_feromonal += nuevo_aporte_hormiga
    }

    getEvaporacionFeromona()
    {
        return ((1-settings_aco.evaporation) * this.feromona)
    }

    updateFeromona() {
        let nueva_feromona = (this.getEvaporacionFeromona() + this.getContribucionTotal())
        this.setFeromona(nueva_feromona)
        this.resetContribucionTotal()
    }
 
}
/**
 * Permite crear un Grafo con aristas que no tienen direccion
 */
class Graph
{
    constructor()
    {
        this.nodos = {}
        this.aristas = {}
        this.nombres_aristas = []
        this.nodos_obj = []
    }

    agregarNodo(nodo)
    {
        this.nodos[nodo.getNombre()] = []
        this.nodos_obj.push(nodo)
    }

    agregarArista(arista)
    {
        this.nodos[arista.getInicio().getNombre()].push(arista)
        this.aristas[arista.getNombre()] = arista
        this.nombres_aristas.push(arista.getNombre())
        //this.nodos[arista.getFin().getNombre()].push(arista.getInverso())
    }

    nodoEnGrafo(nombre_nodo){
        if (this.nodos[nombre_nodo] != undefined) {
            return true
        }
        return false
    }
    //Realmente se obtienen las aristas, solo que se usa el nodo_fin
    getNodosVecinos(nombre_nodo){
        let vecinos = undefined
        if (this.nodoEnGrafo(nombre_nodo)) {
           vecinos = this.nodos[nombre_nodo]
        }
        return vecinos
    }
    getAristas() { return this.aristas}
    getNodos  () { return this.nodos}
    getNodosObj () { return this.nodos_obj}
    getNombresAristas() {return this.nombres_aristas}
    verGrafo()
    {
        console.log(this.nodos)
    }
}


export {Graph, Nodo, Arista}