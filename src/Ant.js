import { settings_aco } from "./utils/settings.js";
class Ant {
  constructor(start) {
    this.path = [];
    this.nodo = start;
    this.addNode(this.nodo)
  }

  addNode(name_node) {
    this.path.push(name_node);
  }

  move(nodo) {
    this.nodo = nodo;
    this.addNode(nodo);
  }
  length() {
    return this.path.length;
  }

  getNodoActual() {
    return this.nodo;
  }

  getPath() {
    return this.path;
  }
}

class ACO {
  constructor(graph) {
    this.best_way = [];
    this.graph = graph;
    this.iteration = 0
  }
  aprox() {
    let start = "EZE";
    let test = new Ant(start);

    let nextNodo = this.getNextNodo(test);
    test.move(nextNodo);

    return this.best_way;
  }

  getNextNodo(ant_i) {
    let nodo = "";
    let nodo_siguiente = "";
    let path_ant = [];
    let neighbors = [];

    nodo = ant_i.getNodoActual();
    path_ant = ant_i.getPath();
    neighbors = this.graph.getNodosVecinos(nodo);

    let options = neighbors.filter(arista => !path_ant.includes(arista.nodo_fin.getNombre()))
    
    let addition_tao_visibility = 0

    /**
     * REFACTORIZAR
     */
    for (let index = 0; index < options.length; index++) {
        const arista = options[index];
        let tao_visibility = arista.visibilidad * arista.feromona
        arista.setVisibilidadFeromona(tao_visibility)
        addition_tao_visibility += tao_visibility
    }

    for (let index = 0; index < options.length; index++) {
        const arista = options[index];
        let pxy = arista.getVisibilidadFeromona() / addition_tao_visibility
        arista.setPxy(pxy) 
    }

    let selection = Math.random()

    let value = 0
    
    //console.log("Selecction", selection)

    for (let index = 0; index < options.length; index++) {
        const arista = options[index];
        let li = value
        value += arista.getPxy()
        let ls = value
        //console.log("[",li,",",ls,"]")
        if (selection >= li && selection <= ls) {
            nodo_siguiente = arista.nodo_fin.getNombre()
            return nodo_siguiente
        }
    }

    /**
     * HASTA AQUÍ
     */
    
  }
}


export {ACO}