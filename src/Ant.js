import { settings_aco } from "./utils/settings.js";
class Ant {
  constructor(start) {
    this.path = [];
    this.nodo = start;
    this.addNode(this.nodo)
    //this.energy_total = 10; Variable inventada, estaria chevere ver como usarla
    this.cost = 0;
  }

  addNode(name_node) {
    this.path.push(name_node);
  }

  move(arista) {
    this.nodo = arista.nodo_fin.getNombre();
    this.cost += arista.peso
    this.addNode(this.nodo);
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

  getCost() {return this.cost}
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

    while (test.getPath().length != 10) {
      let nextArista = this.getNextArista(test);
      test.move(nextArista);
    }

    console.log("Camino: "+test.getPath()+ ", Costo:"+test.getCost())

    return this.best_way;
  }

  best_way(ants){}

  getNextArista(ant_i) {
    let nodo = "";
    let arista_siguiente = {};
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
            arista_siguiente = arista
            return arista_siguiente
        }
    }

    /**
     * HASTA AQUÍ
     */
    
  }
}


export {ACO}