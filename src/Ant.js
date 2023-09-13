import { settings_aco } from "./utils/settings.js";
class Ant {
  constructor(start) {
    this.path = [];
    this.nodo = start;
    this.addNode(this.nodo);
    //this.energy_total = 10; Variable inventada, estaria chevere ver como usarla
    this.cost = 0;
  }

  addNode(name_node) {
    this.path.push(name_node);
  }

  move(arista) {
    this.nodo = arista.nodo_fin.getNombre();
    this.cost += arista.peso;
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

  getCost() {
    return this.cost;
  }
}

class ACO {
  constructor(graph) {
    this.best_way = [];
    this.graph = graph;
    this.iteration = 0;
    this.beginnings = [];
    this.ant_per_node = 0;
  }

  /**
   * Create array with all nodes for beginning (ANTS)
   */
  aprox() {
    this.generateStarts();
    //this.buildAnts()
    let start = "EZE";
    let test = new Ant(start);

    while (test.getPath().length != 10) {
      let nextArista = this.getNextArista(test);
      test.move(nextArista);
    }
    console.log("Camino: " + test.getPath() + ", Costo:" + test.getCost());

    return this.best_way;
  }

  getBegin() {
    let nombre_nodo = "";
    console.log(this.beginnings);
    for (const i in this.beginnings) {
      if (this.beginnings[i].value != 0) {
        nombre_nodo = this.beginnings[i].name;
        this.beginnings[i].max_value -= 1;
        //console.log(this.beginnings[i])
      }
    }
    nombre_nodo;
  }
  buildAnts(amount_ants = settings_aco.amount_ants) {
    let ants = [];
    for (let index = 0; index < amount_ants; index++) {
      let ant_i = new Ant(this.getBegin());
      ants.push(ant_i);
    }
    return ants;
  }

  best_way(ants) {
    let cost_actual = ants[0].getCost();
    let best_way = ants[0].getPath();
    for (let index = 1; index < ants.length; index++) {
      const ant_i = ants[index];
      if (cost_actual > ant.getCost()) {
        best_way = ant_i.getPath();
      }
    }
    return best_way;
  }

  getNextArista(ant_i) {
    let nodo = "";
    let arista_siguiente = {};
    let path_ant = [];
    let neighbors = [];

    nodo = ant_i.getNodoActual();
    path_ant = ant_i.getPath();
    neighbors = this.graph.getNodosVecinos(nodo);

    let options = neighbors.filter(
      (arista) => !path_ant.includes(arista.nodo_fin.getNombre())
    );

    let addition_tao_visibility = 0;

    /**
     * REFACTORIZAR
     */
    for (let index = 0; index < options.length; index++) {
      const arista = options[index];
      let tao_visibility = arista.visibilidad * arista.feromona;
      arista.setVisibilidadFeromona(tao_visibility);
      addition_tao_visibility += tao_visibility;
    }

    for (let index = 0; index < options.length; index++) {
      const arista = options[index];
      let pxy = arista.getVisibilidadFeromona() / addition_tao_visibility;
      arista.setPxy(pxy);
    }

    let selection = Math.random();

    let value = 0;

    //console.log("Selecction", selection)

    for (let index = 0; index < options.length; index++) {
      const arista = options[index];
      let li = value;
      value += arista.getPxy();
      let ls = value;
      //console.log("[",li,",",ls,"]")
      if (selection >= li && selection <= ls) {
        arista_siguiente = arista;
        return arista_siguiente;
      }
    }

    /**
     * HASTA AQUÍ
     */
  }

  generateStarts() {
    let ants_asigned = 0;
    let names_nodes = Object.keys(this.graph.getNodos());

    this.ant_per_node = Math.round(
      settings_aco.amount_ants / names_nodes.length
    );

    let tempora_ant_per_node = this.ant_per_node;

    for (let i = 0; i < names_nodes.length; i++) {
      if (i == names_nodes.length - 1) {
        let total_ants = ants_asigned + tempora_ant_per_node; //Se calcula valor final
        if (total_ants != settings_aco.amount_ants) {
          let nw_max = settings_aco.amount_ants - ants_asigned;
          let data = { name: names_nodes[i], max_value: nw_max };
          this.beginnings.push(data);
          ants_asigned += nw_max;
        }
        let data = { name: names_nodes[i], max_value: tempora_ant_per_node };
        this.beginnings.push(data);
      } else {
        let data = { name: names_nodes[i], max_value: tempora_ant_per_node };
        this.beginnings.push(data);
        ants_asigned += tempora_ant_per_node;
      }
    }
    console.log(this.beginnings);
  }
  /**
   * Calculate the: amount of ants/nodes
   */
}

export { ACO };
