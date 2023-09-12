class Nodo
{
    constructor(nombre, latitud, longitud)
    {
        this.nombre = nombre
        this.latitud = latitud
        this.longitud = longitud
    }
    getLongitud() { return this.longitud }
    getLatitud () { return this.latitud  }
    getNombre  () { return this.nombre   }
    
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
    constructor(nodo_inicio, nodo_fin, peso, feromona)
    {
        this.nodo_inicio = nodo_inicio
        this.nodo_fin = nodo_fin

        this.peso = peso
        this.feromona = feromona
    }

    
    getInverso ()         { return new Arista(this.nodo_fin, this.nodo_inicio, this.peso, this.feromona)}
    
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